let Docxtemplater = require('docxtemplater');
let JSZip = require('jszip');
let fs = require('fs');

let calculateService = require('../utils/calculate.service')

let docxService = {
  writeBillDoc: writeBillDoc,
  getBillDoc : getBillDoc
}

function writeBillDoc(bill) {
  let content = fs
    .readFileSync(__dirname + "/bill.docx", "binary");
  let zip = new JSZip(content);
  let doc = new Docxtemplater().loadZip(zip)
  doc.setData(prepareData(bill))
  doc.render();
  var buf = doc.getZip()
    .generate({
      type: "nodebuffer"
    });
    return buf;
  //fs.writeFileSync(`${__dirname}/${bill.number}_${bill.data.customerName}.docx`, buf);
}

function getBillDoc(bill) {
  return writeBillDoc(bill)

}

function prepareData(bill) {
  let {customerName, customerAddress, customerCity, customerPostalCode, number, billTotalHT, billTotalTTC, type, formattedDate, interventions} = bill.data
  interventions20 = interventions.filter(({tva}) => tva === '20')
  interventions10 = interventions.filter(({tva}) => tva === '10')
  let amountTVA20 = calculateService.calculateTvaAmount(interventions20);
  let amountTVA10 = calculateService.calculateTvaAmount(interventions10);

  return {
    customerName,
    customerAddress,
    customerCity : customerCity.city,
    customerPostalCode,
    number,
    billTotalHT,
    billTotalTTC,
    type,
    date:formattedDate,
    interventions,
    amountTVA10,
    amountTVA20
  }
}


module.exports = docxService;
