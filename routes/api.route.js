let Express = require('express')
let Bears = require('./bears/bears.route')
let Bills = require('./bills/bills.route')
let Files = require('./files/files.route')

let router = Express.Router({mergeParams: true});
router.use('/bears', Bears);
router.use('/bills', Bills);
router.use('/files', Files);

module.exports = router;
