let Express = require('express')
let Bears = require('./bears/bears.route')
let Bills = require('./bills/bills.route')
let Files = require('./files/files.route')
let Version = require('./version/version.route')

let router = Express.Router({mergeParams: true});
router.use('/bears', Bears);
router.use('/bills', Bills);
router.use('/files', Files);
router.use('/version', Version)
module.exports = router;
