const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
chai.use(chaiHttp);

describe('Stock Price API', () => {
    it('should get the price of a stock', (done) => {
        chai.request(server)
            .get('/api/stock-prices?stock=GOOG')
            .end((err, res) => {
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.have.property('stockData');
                chai.expect(res.body.stockData).to.be.an('array').that.is.not.empty;
                chai.expect(res.body.stockData[0]).to.have.property('stock').equal('GOOG');
                chai.expect(res.body.stockData[0]).to.have.property('price');
                done();
            });
    });

    it('should get the price of a stock and handle likes', (done) => {
        chai.request(server)
            .get('/api/stock-prices?stock=GOOG&like=true')
            .end((err, res) => {
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.have.property('stockData');
                chai.expect(res.body.stockData).to.be.an('array').that.is.not.empty;
                chai.expect(res.body.stockData[0]).to.have.property('stock').equal('GOOG');
                chai.expect(res.body.stockData[0]).to.have.property('likes');
                done();
            });
    });

    // Additional tests can go here...
});
