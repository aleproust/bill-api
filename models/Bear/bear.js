'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema

var BearSchema  = new Schema({
    date: { type: Date, default: Date.now },
    data: Object,
    name:{type:String}
});

module.exports = {
    Bear : mongoose.model('Bear', BearSchema)
};
