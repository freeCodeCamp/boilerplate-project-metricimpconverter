const chai = require('chai');
const { test } = require('mocha');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    this.timeout(500)
    test('#Whole Numbers', function(done) {
        const input = '32km'
        assert.isNumber(convertHandler.getNum(input))
        assert.equal(convertHandler.getNum(input), 32)
        done()
    })
    test('#Decimal', function(done) {
        const input = '3.2km'
        assert.isNumber(convertHandler.getNum(input))
        assert.equal(convertHandler.getNum(input), 3.2)
        done()
    })
    test('#Fractional Numbers', function(done) {
        const input = '3/5km'
        assert.isNumber(convertHandler.getNum(input))
        assert.equal(convertHandler.getNum(input), 0.6 )
        done()
    })
    test('#Fractional with decimal', function(done) {
        const input = '3/0.5km'
        assert.isNumber(convertHandler.getNum(input))
        assert.equal(convertHandler.getNum(input), 6 )
        done()
    })
    test('#double fraction', function(done) {
        const input = '2/3/4kg'
        assert.isNotNumber(convertHandler.getNum(input))
        assert.equal(convertHandler.getNum(input), 'invalid number' )
        done()
    })
    test('#default number', function(done) {
        const input = ''
        assert.isNumber(convertHandler.getNum(input))
        assert.equal(convertHandler.getNum(input), 1 )
        done()
    })
    test('#valid units', function(done) {
        const units = ['mi', 'km', 'l', 'gal', 'kg', 'lbs']
        units.forEach(item => assert.notEqual(convertHandler.getUnit(item), 'invalid unit'))
        done()
    })
    test('#invalid units', function(done) {
        const units = ['min', 'mg', 'kms', 'lb']
        units.forEach(item => assert.equal(convertHandler.getUnit(item), 'invalid unit')  )
        done()
    })
    test('#valid unit return', function(done) {
        const units = ['mi', 'km', 'L', 'gal', 'kg', 'lbs']
        const inputs = ['mi', 'km', 'l', 'gal', 'kg', 'lbs', 'Mi', 'KM', 'L']
        units.forEach(item => assert.include(units, convertHandler.getUnit(item))  )
        done()
    })
    test('#spell out unit', function(done) {
        const units = ['mi', 'km', 'L', 'gal', 'kg', 'lbs']
        const obj = {
            mi: 'miles',
            km: 'kilometers',
            L: 'liters',
            gal: 'gallons',
            kg: 'kilograms',
            lbs: 'pounds'
        }
        units.forEach(item => assert.equal(convertHandler.spellOutUnit(item), obj[item]))
        done()
    })
    test('#gal to L', function(done) {
        assert.equal(convertHandler.convert(1,'gal'), 3.78541)
        done()
    })
    test('#L to gal', function(done) {
        assert.equal(convertHandler.convert(1,'l'), 0.26417)
        done()
    })
    test('#mi to km', function(done) {
        assert.equal(convertHandler.convert(1,'mi'), 1.60934)
        done()
    })
    test('#km to mi', function(done) {
        assert.equal(convertHandler.convert(1,'km'), 0.62137)
        done()
    })
    test('#lbs to kg', function(done) {
        assert.equal(convertHandler.convert(1,'lbs'), 0.45359)
        done()
    })
    test('#kg to lbs', function(done) {
        assert.equal(convertHandler.convert(1,'kg'), 2.20462)
        done()
    })

});