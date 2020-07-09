/*
*
*
*       Complete the handler logic below
*       
*       
*/

const { init } = require("../server");

const conversionObject = {
  kg: 'lbs',
  lbs: 'kg',
  mi: 'Km',
  km: 'mi',
  gal: 'L',
  l: 'gal'
}

const unitSpells = {
  kg: 'kilograms',
  lbs: 'pounds',
  mi: 'miles',
  km: 'kilometers',
  gal: 'gallons',
  l: 'liters'
}

function ConvertHandler() {
  this.divideFraction = function(input) {
    input = input.split( '/' );
    return input.length <= 2
            ? this.round(input.reduce( ( a,b ) => a / b ))
            : null;
  }
  
  this.round = function roundToFive(num) {    
    return +(Math.round(num + "e+5")  + "e-5");
  }

  this.getNum = function(input) {
    var result = input
    var unitIndex = input.search(/[a-z]/i);

    return this.divideFraction(result.substring(0, unitIndex));
  };
  
  this.getUnit = function(input) {
    var result = input
    var unitIndex = input.search(/[a-z]/i);

    return result.slice(unitIndex);
  };
  
  this.getReturnUnit = function(initUnit) {
    return conversionObject[initUnit.toLowerCase()];
  };

  this.spellOutUnit = function(unit) {
    return unitSpells[unit.toLowerCase()];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    const value = initNum
    const unitValue = initUnit.toLowerCase()

    switch (unitValue) {
      case 'km':
        return this.round(value / miToKm)

      case 'mi':
        return this.round(value * miToKm)
    
      case 'gal':
        return this.round(value * galToL)

      case 'l':
        return this.round(value / galToL)

      case 'kg':
        return this.round(value / lbsToKg)

      case 'lbs':
        return this.round(value * lbsToKg)

      default:
        return 'invalid number and unit';
    }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
