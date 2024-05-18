const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  test('Number Test', function() {
    assert.equal(convertHandler.getNum('1Kg'), 1, 'convertHandler should correctly read a whole number input.');
    assert.equal(convertHandler.getNum('1.0Kg'), 1, 'convertHandler should correctly read a decimal number input.');
    assert.equal(convertHandler.getNum('1/1Kg'), 1, 'convertHandler should correctly read a fractional input.');
    assert.equal(convertHandler.getNum('1/1.0Kg'), 1, 'convertHandler should correctly read a fractional input with a decimal.');
    assert.equal(convertHandler.getNum('Kg'), 1, 'convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.');
  });
  test('Unit Test', function(){
    const units = [
      ['Kg', 'Kg', 'Kilograms'],
      ['Km', 'Km', 'Kilometers'],
      ['L', 'L', 'Liters'],
      ['lbs', 'lbs', 'Pounds'],
      ['mi', 'mi', 'Miles'],
      ['gal', 'gal', 'Gallons']
    ];
    const returnUnits = [
      ['Kg', 'lbs'],
      ['Km', 'mi'],
      ['L', 'gal']
    ];
    units.forEach(elem => {
      const fixElem = elem.map(unit => unit.toLowerCase());
      assert.equal(convertHandler.getUnit(fixElem[0]), fixElem[1], 'convertHandler should correctly read each valid input unit.');
      assert.equal(convertHandler.spellOutUnit(fixElem[0]), fixElem[2], 'convertHandler should correctly return the spelled-out string unit for each valid input unit.');
    })
    returnUnits.forEach(elem => {
      const fixElem = elem.map(unit => unit.toLowerCase());
      assert.equal(convertHandler.getReturnUnit(fixElem[0]), fixElem[1], 'convertHandler should return the correct return unit for each valid input unit.');
    })
  });
  test('Conversion Testing', function(){
    assert.approximately(convertHandler.convert(1, 'Kg'), 2.20462, 0.01, 'convertHandler should correctly convert kg to lbs.');
    assert.approximately(convertHandler.convert(1, 'Km'), 0.62137, 0.01, 'convertHandler should correctly convert km to mi.');
    assert.approximately(convertHandler.convert(1, 'L'), 0.26417, 0.01, 'convertHandler should correctly convert L to gal.');
    assert.approximately(convertHandler.convert(1, 'lbs'), 0.45359, 0.01, 'convertHandler should correctly convert lbs to kg.');
    assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.01, 'convertHandler should correctly convert mi to km.');
    assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.01, 'convertHandler should correctly convert gal to L.');
  });
  test('Error Testing', function() {
    assert.isNull(convertHandler.getNum('1/1/1Kg'), 'convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).')
    assert.isNull(convertHandler.getUnit('1Ka'), 'convertHandler should correctly return an error for an invalid input unit.')
  });
});