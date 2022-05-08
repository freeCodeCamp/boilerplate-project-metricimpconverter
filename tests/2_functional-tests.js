const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');
const { test } = require('mocha');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test('#GET 10L', function(done) {
        chai
            .request(server)
            .get('/api/convert?input=10L')
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.isObject(res.body)
                assert.property(res.body, 'initNum')
                assert.property(res.body, 'initUnit')
                assert.property(res.body, 'returnNum')
                assert.property(res.body, 'returnUnit')
            })
        done()
    })
    test('#invalid unit', function(done) {
        chai
            .request(server)
            .get('/api/convert?input=32g')
            .end((err, res) => {
                assert.equal(res.status, 400);
                assert.equal(res.text, 'invalid unit')
            })
        done()
    })
    test('#invalid number', function(done) {
        chai
            .request(server)
            .get('/api/convert?input=1/2/3kg')
            .end((err, res) => {
                assert.equal(res.status, 400);
                assert.equal(res.text, 'invalid number')
            })
        done()
    })
    test('#invalid number & unit', function(done) {
        chai
            .request(server)
            .get('/api/convert?input=1/2/3kgs')
            .end((err, res) => {
                assert.equal(res.status, 400);
                assert.equal(res.text, 'invalid number and unit')
            })
        done()
    })
    test('#no number', function(done) {
        chai
            .request(server)
            .get('/api/convert?input=1/2/3kgs')
            .end((err, res) => {
                assert.equal(res.status, 400);
                assert.equal(res.text, 'invalid number and unit')
            })
        done()
    })
});
