const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

  suite('Function convertHandler.getNum(input)', function(){

    test('Whole number input', function(done){
      let input = '32L';
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });

    test('Decimal input', function(done){
      //done();
    })
  });

  suite('Function convertHandler.getUnit(input)', function(){

    test('For Each Valid Unit Inputs', fucntion(done){
      let input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      input.forEach(function(ele){
        assert.equal(convertHandler.getUnit(32 + ele), ele)
      });
      done();
    });

    test('Unknown unit input', fucntion(done){
      //done();
    })
  });

  suite('Function convertHandler.getReturnUnit(initUnit)', function(){

    test('For Each Valid Unit Inputs', function(done){
      let input = ['gal','l','mi','km','lbs','kg'];
      let expected = ['l','gal','km','mi','kg','lbs'];
      input.forEach((ele, i) => {
          assert.equal(convertHandler.getReturnUnit(ele), expected(i));
      });

      //done();
    });

  suite('Function convertHandler.spellOutUnit(unit)', function(){

    test('For Each Valid Unit Inputs', function(done){
      //done();
    });

  suite('Function convertHandler.convert(num, unit)', function(){

    test('Gal to L', function(done){
      var input = [5, 'gal'];
      var expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
    test('L to Gal', function(done){
      var input = [5, 'l'];
      var expected = 1.32086;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });

  });
});
