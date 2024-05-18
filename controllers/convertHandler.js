function ConvertHandler() {
  // Method to extract the numeric value from the input string
  this.getNum = function(input) {
    const valRegex = /^(\w+)?(?:^\d+(?:(\.\d+(\/\d+(\.\d+)?)?)|(\/\d+(\.\d+)?))?)?(\w+)$/i;
    const noNumRegex = /^(Kg|lbs|L|gal|Km|mi)$/i;

    const isValid = valRegex.test(input);
    const isNoNum = noNumRegex.test(input); 

    let result;
    
    if (!isValid) {
      return null;
    }
    if (!isNoNum) {
      const numRegex = /^\d+(?:(\.\d+(\/\d+(\.\d+)?)?)|(\/\d+(\.\d+)?))?/g;
      const fracRegex = /^\d+(\.\d+)?\/\d+(\.\d+)?/g;

      result = input.match(numRegex).join('');
      const isFrac = fracRegex.test(result);

      if (!isFrac) {
        return result;
      } else {
        const parseNum = () => {
          const terms = result.split(/([\+\-\*\/])/g)
            .filter(term => term.trim() !== '')
            .map(term => isNaN(term) ? term : Number(term));
          
          let parsed;
          let operand1 = terms[0];

          for (let i = 1; i < terms.length; i += 2) {
            const operand2 = terms[i + 1];
            parsed = operand1 /= operand2;
          }

          return parsed;
        };
        result = parseNum();
        return result;
      }
    }
    result = '1'
    return result;
  };
  
  // Method to extract the unit from the input string
  this.getUnit = function(input) {
    const unitRegex = /(Kg|lbs|L|gal|Km|mi)$/gi;
    
    const isValid = unitRegex.test(input);
  
    let result;
  
    if (!isValid) {
      return null; 
    }
    result = input.match(unitRegex).join('');
    return result;
  };
  
  // Method to determine the return unit based on the initial unit
  this.getReturnUnit = function(initUnit) {
    let result;
    const unitsArr = [
      ['Km', 'mi'],
      ['Kg', 'lbs'],
      ['L', 'gal']
    ];

    unitsArr.forEach(elem => {
      const fixElem = elem.map(str => str.toLowerCase());
      const fixUnit = initUnit.toLowerCase();

      if (fixElem.includes(fixUnit)) {
        switch (true) {
          case (fixElem[0] === fixUnit):
            result = elem[1];
            break;
          case (fixElem[1] === fixUnit):
            result = elem[0];
            break
          default:
            break;
        }
      }
    });

    return result;
  };

  // Method to spell out the full name of a given unit
  this.spellOutUnit = function(unit) {
    const unitsName = {
      'Km': 'kilometers',
      'Kg': 'kilograms',
      'L': 'liters',
      'mi': 'miles',
      'lbs': 'pounds',
      'gal': 'gallons',
    }
    
    let result;

    for (unitName in unitsName) {
      if (unit.toLowerCase() === unitName.toLowerCase()) {
        result = unitsName[unitName];
        break;
      }
    };

    return result;
  };
  
  // Method to perform the conversion based on initial number and unit
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    const unitsArr = [
      ['Km', 'mi', miToKm],
      ['Kg', 'lbs', lbsToKg],
      ['L', 'gal', galToL]
    ];

    let result;

    unitsArr.forEach(elem => {
      const fixElem = elem.map(item => typeof item === 'string' ? item.toLowerCase(): item);
      const fixUnit = initUnit.toLowerCase();

      if (fixElem.includes(fixUnit)) {
        switch (true) {
          case (fixElem[0] === fixUnit):
            result = initNum / elem[2];
            break;
          case (fixElem[1] === fixUnit):
            result = initNum * elem[2];
            break
          default:
            break;
        }
      }
    });

    return Number(result.toFixed(5));
  };
  
  // Method to generate a string describing the conversion
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = { 
      initNum: initNum, 
      initUnit: initUnit, 
      returnNum: returnNum, 
      returnUnit: returnUnit, 
      string: `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
    };

    return result;
  };

}

module.exports = ConvertHandler;
