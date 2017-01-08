// Module dependencie
let express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  DOCX = require('../../services/docx/docx.service'),
  XLS = require('../../services/xls/xls.service')
  Bill = require('../../models/Bill/bill').Bill;
mongoose.Promise = Promise;
let api = {
  getBillDoc: getBillDoc,
  generateBillsExcelList : generateBillsExcelList
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

function generateBillsExcelList(req, res){
    let billList = req.body
    XLS.getExcelFile(billList).then(file => {
        res.download(file);
    })
   
     
}
router.get('/:billNumber', api.getBillDoc);
router.post('/generateExcel', api.generateBillsExcelList);

module.exports = router;
