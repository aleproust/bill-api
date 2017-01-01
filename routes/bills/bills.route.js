// Module dependencie
let express = require('express'),
  moment = require('moment'),
  router = express.Router(),
  mongoose = require('mongoose'),
  DOCX = require('../../services/docx/docx.service'),
  Bill = require('../../models/Bill/bill').Bill;
mongoose.Promise = Promise;
api = {
  getBills: getBills,
  postBills: postBills,
  putBills: putBills,
  findBills: findBills
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
      'data.type': type
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
      return res.status(201).json(bill.toObject())
    })
    .catch(err => res.status(500).json(err))

}
;

// Put Bills
function putBills(req, res) {
  let billNumber = req.params.billNumber;
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

// Find Bills
function findBills(req, res) {
  let queryPromise = null;
  let criteriaObject = req.body;
  if (criteriaObject.criteria === 'date') {
    let dateCriteria = getDateCriteria(criteriaObject.value)
    queryPromise = Bill.find({
      'data.date':{ $gte:dateCriteria.start, $lt:dateCriteria.end }
    })
  }
  else{
    let searchObject = {}
    searchObject[`data.${criteriaObject.criteria}`] = {'$regex':criteriaObject.value}
    queryPromise = Bill.find(searchObject)
  }
  queryPromise
  .then(bills=> {
    res.status(200).json(bills)
  })
  .catch(error => console.log(error))



}

function getDateCriteria(date) {
  let momentDate = moment(date)
  let month = momentDate.get('month')
  let year = momentDate.get('year')
  let startDate = moment([year, month]);
  let endDate = moment(startDate).endOf('month');
  return {start : startDate.toDate(), end : endDate.toDate()}
}

router.get('/', api.getBills)
router.get('/:billNumber', api.getBills);
router.post('/find', api.findBills)
router.post('/:billNumber', api.postBills);
router.put('/:billNumber', api.putBills);

module.exports = router;
