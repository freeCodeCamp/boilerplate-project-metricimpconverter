'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

    app.get('/api/convert', (req, res) => {
        let convertHandler = new ConvertHandler();
        const { input } = req.query;
        try {
            const initNum = convertHandler.getNum(input);
            const initUnit = convertHandler.getUnit(input);
            const returnUnit = convertHandler.getReturnUnit(initUnit);
            const spellOutUnit = convertHandler.spellOutUnit(initUnit);
            const returnNum = convertHandler.convert(initNum, initUnit);
            const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
          console.log(initNum, initUnit)
          if (initNum === 'invalid number' && initUnit === 'invalid unit') throw new Error('invalid number and unit')
          if (initNum === 'invalid number' ) throw new Error('invalid number')
          if (initUnit === 'invalid unit') throw new Error('invalid unit')

            res.json({ initNum, initUnit, returnNum, returnUnit, string })
        }
        catch(e) {
            
            res.status(400).send(e.message)
        }
    })

};
