'use strict';

const express = require('express');
const request = require('request');

const router = express.Router();

// Route to handle GET requests to /api/stock-prices
router.get('/api/stock-prices', (req, res) => {
    const stocks = Array.isArray(req.query.stock) ? req.query.stock : [req.query.stock];
    const like = req.query.like === 'true';
    const stockData = [];

    // Iterate through each stock symbol to fetch data
    const fetchStockData = (symbol) => {
        // Replace 'YOUR_API_URL' with the actual API endpoint for stock prices
        return new Promise((resolve, reject) => {
            const apiUrl = `YOUR_API_URL?symbol=${symbol}`;
            request(apiUrl, (error, response, body) => {
                if (error) {
                    return reject(error);
                }
                const data = JSON.parse(body);
                resolve(data);
            });
        });
    };

    // Fetch data for all stocks
    Promise.all(stocks.map(fetchStockData))
        .then(results => {
            results.forEach((result, index) => {
                stockData.push({
                    stock: stocks[index],
                    price: result.price, // Adjust according to the API response structure
                    likes: like ? (result.likes || 0) + 1 : result.likes // Handle likes
                });
            });
            res.json(stockData);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error fetching stock data');
        });
});

module.exports = router;

// Main app file
module.exports = function (app) {
    app.use(router);
};
