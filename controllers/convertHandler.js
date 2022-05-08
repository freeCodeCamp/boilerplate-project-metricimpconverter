function ConvertHandler() {

    this.getNum = function (input) {
        
        const idx = input.search(/[a-z]/i); 
        let num = input.slice(0, idx)

        if (/\d+\/\d+\/\d+/.test(num)) return 'invalid number'
        if (/\/\//.test(num)) return 'invalid number'
        if (num === '') return 1
        
        try {
          return Number(eval(num));
        } 
        catch {
          return 'invalid number'
        }
    };

    this.getUnit = function (input) {
    
        const idx = input.search(/[a-z]/i);
        if (idx === -1) return 'invalid unit';
      
        const unit = input.slice(idx,)
        const units = ['mi', 'km', 'gal', 'L', 'lbs', 'kg']

        for (let item of units) {
          if ( item.toLowerCase() === unit.toLowerCase()) return item
        }
      
        return 'invalid unit'
    };

    this.getReturnUnit = function (initUnit) {

        let obj = {
            gal: 'L',
            lbs: 'kg',
            mi: 'km'
        }

        for (let item in obj) {
            if (item.toLowerCase() === initUnit.toLowerCase()) return obj[item]
            if (obj[item].toLowerCase() === initUnit.toLowerCase()) return item
        }
        return 'invalid unit'
    };

    this.spellOutUnit = function (unit) {
        let result;
        unit = unit.toLowerCase()

        switch (unit) {
            case 'gal':
                return 'gallons'

            case 'lbs':
                return 'pounds'

            case 'mi':
                return 'miles'

            case 'l':
                return 'liters'

            case 'kg':
                return 'kilograms'

            case 'km':
                return 'kilometers'

            default:
                return 'Invalid Unit'
        }
    };

    this.convert = function (initNum, initUnit) {
        const galToL = 3.78541;
        const lbsToKg = 0.453592;
        const miToKm = 1.60934;
        
        unit = initUnit.toLowerCase()

        switch (unit) {
            case 'gal':
                return Math.round(initNum * galToL * 100000) / 100000

            case 'lbs':
                return Math.round(initNum * lbsToKg * 100000) / 100000

            case 'mi':
                return Math.round(initNum * miToKm * 100000) / 100000

            case 'l':
                return Math.round(initNum / galToL * 100000) / 100000

            case 'kg':
                return Math.round(initNum / lbsToKg * 100000) / 100000

            case 'km':
                return Math.round(initNum / miToKm * 100000) / 100000

            default:
                return 'Invalid Unit'
        }        
    };

    this.getString = function (initNum, initUnit, returnNum, returnUnit) {

        return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    };

}


module.exports = ConvertHandler;
