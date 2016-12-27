// Module dependencie
let express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  DOCX = require('../../services/docx/docx.service'),
  Bill = require('../../models/Bill/bill').Bill;
mongoose.Promise = Promise;
let api = {
  getBillDoc: getBillDoc
};

function getBillDoc(req, res) {
  let billNumber = req.params.billNumber;
  let query = undefined
  query = Bill.findOne({
    'number': billNumber,
  })
  query.then(bill => {
    res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
    res.write(DOCX.getBillDoc(bill.toObject()), 'binary');
    res.end()
  })

}
router.get('/:billNumber', api.getBillDoc);
module.exports = router;
