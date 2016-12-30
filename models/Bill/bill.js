'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema

var BillSchema  = new Schema({
    date: { type: Date, default: Date.now },
    data: {
      date:{type: Date},
      billTotalHT: {type:String},
      billTotalTTC: {type:String},
      customerAddress : {type:String},
      customerCity : {type:Object},
      customerName:{type:String},
      customerPostalCode:{type:String},
      formattedDate:{type:String},
      interventions:{type: Array},
      isPaid:{type:Boolean},
      paidDate:{type:Date},
      paidMethod:{type:String},
      type:{type:String},
      number:{type:String}
    },
    number:{type:String, unique:true}
});

module.exports = {
    Bill : mongoose.model('Bill', BillSchema)
};
