'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema

var BillSchema  = new Schema({
    date: { type: Date, default: Date.now },
    data: Object,
    number:{type:String, unique:true}
});

module.exports = {
    Bill : mongoose.model('Bill', BillSchema)
};
