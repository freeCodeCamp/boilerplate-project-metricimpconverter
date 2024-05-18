const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

const convertApiEP = '/api/convert';

suite("Functional Tests", function() {
  test('get {input: "10L"}', function(done) {
    chai
      .request(server)
      .get(convertApiEP)
      .query({'input': '10L'})
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.initNum, 10);
        assert.equal(res.body.initUnit, 'L');
        assert.equal(res.body.returnNum, 2.64172);
        assert.equal(res.body.returnUnit, 'gal');
        assert.equal(res.body.string, '10 liters converts to 2.64172 gallons');
        done();
      });
  });
  test('get {input: "32g"}', function (done) {
    chai
      .request(server)
      .get(convertApiEP)
      .query({'input': '32g'})
      .end(function(err, res) {
        assert.equal(res.text, 'Invalid Units');
        done();
      })
  });
  test('get {input: "3/7.2/4kg"}', function (done) {
    chai
      .request(server)
      .get(convertApiEP)
      .query({'input': '3/7.2/4kg'})
      .end(function(err, res) {
        assert.equal(res.text, 'Invalid Number');
        done();
      })
  });
  test('get {input: "3/7.2/4kilomegagram"}', function (done) {
    chai
      .request(server)
      .get(convertApiEP)
      .query({'input': '3/7.2/4kilomegagram'})
      .end(function(err, res) {
        assert.equal(res.text, 'Invalid Number and Units');
        done();
      })
  });
  test('get {input: "kg"}', function (done) {
    chai
      .request(server)
      .get(convertApiEP)
      .query({'input': 'kg'})
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, 'kg');
        assert.equal(res.body.returnNum, 2.20462);
        assert.equal(res.body.returnUnit, 'lbs');
        assert.equal(res.body.string, '1 kilograms converts to 2.20462 pounds');
        done();
      })
  });
});
