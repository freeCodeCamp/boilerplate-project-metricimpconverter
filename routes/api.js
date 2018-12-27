/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  var convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res){
      var input = req.query.input;
      var initNum = convertHandler.getNum(input);
      var initUnit = convertHandler.getUnit(input);
    
      if (initNum === 'invalid number' && initUnit === 'invalid unit') return res.status(200).send('invalid number and unit')//res.sendFile(process.cwd() + '/views/invalidBoth.html')
      if (initNum === 'invalid number') return res.status(200).send('invalid number') //res.sendFile(process.cwd() + '/views/invalidNumber.html')
      if (initUnit === 'invalid unit') return res.status(200).send('invalid unit') //res.sendFile(process.cwd() + '/views/invalidUnit.html')
    
      var returnNum = convertHandler.convert(initNum, initUnit);
      var returnUnit = convertHandler.getReturnUnit(initUnit);
      var toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    
     res.json({
          'initNum': initNum,
          'initUnit': initUnit,
          'returnNum': returnNum,
          'returnUnit': returnUnit,
          'string': toString
     })
      //res.json
    });
    
};
