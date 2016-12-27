// Module dependencie
let express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  DOCX = require('../../services/docx/docx.service'),
  Bill = require('../../models/Bill/bill').Bill;
mongoose.Promise = Promise;
api = {
  getBills: getBills,
  postBills: postBills,
  putBills: putBills
};


// GET Bills
function getBills(req, res) {
  let billNumber = req.params.billNumber;
  let query = undefined
  if (billNumber) {
    query = Bill.findOne({
      'number': billNumber,
    })
  } else {
    let type = req.query.type;
    query = Bill.find({
      'data.type' : type
    })
  }
  query.then(bill => {
    res.status(200).json(bill)
  })
    .catch(err => res.status(404).json(err))

}

// ADD Bills
function postBills(req, res) {

  let bill = new Bill();
  bill.number = req.params.billNumber;
  bill.data = req.body;
  bill.save()
    .then(bill => {
      DOCX.writeBillDoc(bill.toObject())
      return  res.status(201).json(bill.toObject())
    })
    .catch(err => res.status(500).json(err))

};

// Put Bills
function putBills(req, res) {
  var billNumber = req.params.billNumber;
  Bill.findOneAndUpdate({
    "number": billNumber
  },
    {
      "$set": {
        "data": req.body
      }
    },
    {
      "new": true
    }).then(bill => res.status(200).json(bill))
    .catch(err => res.status(404).json(err))
}

router.get('/', api.getBills)
router.get('/:billNumber', api.getBills);
router.post('/:billNumber', api.postBills);
router.put('/:billNumber', api.putBills);
module.exports = router;
