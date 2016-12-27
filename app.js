'use strict';

let express = require('express'),
    Inert = require('inert'),
    Vision = require('vision'),
    Joi = require('joi'),
    fs = require('fs'),
    config = require('./config/application'),
    moment = require('moment'),
    expressValidator = require('express-validator'),
    apiRoutes = require('./routes/api.route'),
    bodyParser = require('body-parser'),
    docxService = require('./services/docx/docx.service');


let serverConfig = { };
let app = module.exports = exports.app = express();

// Connect to database
var db = require('./config/db');
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS")
  res.header("Access-Control-Allow-Credentials","true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(expressValidator());
app.use('/api', apiRoutes);
// Start server
let port = process.env.PORT || 8089;
app.listen(port, function () {
    console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});

