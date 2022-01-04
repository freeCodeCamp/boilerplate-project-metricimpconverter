const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  test('For Each Valid Unit Inputs', fucntion(done){
    let input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
    input.forEach(function(ele){
      assert.equal(convertHandler.getUnit(32 + ele), ele)
    });
    done();
  })
});
