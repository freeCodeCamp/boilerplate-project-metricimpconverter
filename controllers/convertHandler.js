/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  
  this.getNum = function(input) {
    var result;
    const firstLetter = /[a-z]/i
    result = input.slice(0, input.indexOf(firstLetter.exec(input)))
    try {
        eval(result); 
    } catch (e) {
        if (e instanceof SyntaxError) {
            return result = 'invalid number';
        }
    }
    if (/[/](.*)([/])/g.test(result)) return result = 'invalid number'; 
    // unnecessary, beacause some expressions with double fractions are still correct
    result = result.replace(',', '.')
    return result !== "" ? eval(result) : 1;
  };
  
  this.getUnit = function(input) {
    var result;
    const firstLetter = /[a-z]/i
    result = input.slice(input.indexOf(firstLetter.exec(input)))
    return /^gal$|^l$|^lbs$|^kg$|^mi$|^km$/i.test(result) ? result: 'invalid unit';
  };
  
  this.getReturnUnit = function(initUnit) {
    var result;
    initUnit = initUnit.toLowerCase()
    switch (initUnit) {
      case "gal":
        result = "L"
        break
      case "l":
        result = "gal"
        break
      case "lbs":
        result = "kg"
        break
      case "kg":
        result = "lbs"
        break
      case "mi":
        result = "km"
        break
      case "km":
        result = "mi"
        break
      default:
        result =  'invalid unit'
        break
    }
    return result;
  };
  
  

  this.spellOutUnit = function(unit) {
    var result;
    unit = unit.toLowerCase()
    switch (unit) {
      case "gal":
        result = 'gallons'
        break
      case "l":
        result = 'liters'
        break
      case "lbs":
        result = 'pounds'
        break
      case "kg":
        result = 'kilograms'
        break
      case "mi":
        result = 'miles'
        break
      case "km":
        result = 'kilometers'
        break
      default:
        result =  'units'
        break
    }
    return result;
  };
  
  
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    var result;
    initUnit = initUnit.toLowerCase()
    switch (initUnit) {
      case "gal":
        result = initNum * galToL;
        break
      case "l":
        result = initNum / galToL
        break
      case "lbs":
        result = initNum * lbsToKg
        break
      case "kg":
        result = initNum / lbsToKg
        break
      case "mi":
        result = initNum * miToKm
        break
      case "km":
        result = initNum / miToKm
        break
      default:
        result =  'invalid number'
        break
    }
    
    return result;
  };
  
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    function roundToFive(num) {    
      return +(Math.round(num + "e+5")  + "e-5");
    }
  
    var result;
    
    result = `${roundToFive(initNum)} ${this.spellOutUnit(initUnit)} converts to ${roundToFive(returnNum)} ${this.spellOutUnit(returnUnit)}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
