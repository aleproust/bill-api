let Excel = require('exceljs');
let stream = require('stream')
let xlsService = {
    getExcelFile : getExcelFile
}

function getExcelFile(billList){
    let workbook = new Excel.Workbook();
    let sheet = workbook.addWorksheet('Feuil 1', {
    pageSetup:{fitToPage: true, fitToHeight: 5, orientation:'landscape', header:'Toto'}});
    let style = { font: { name: 'Verdana', size:10, bold:true }, border:{  top: {style:'thin'},
    left: {style:'thin'},
    bottom: {style:'thin'},
    right: {style:'thin'}}};
    sheet.columns = [
        { header: 'Nom', key: 'customerName', width: 20 , style},
        { header: 'Date', key: 'formattedDate', width: 13, style },
        { header: 'N°', key: 'number', width: 10 , style},
        { header: 'Type', key: 'billType', width: 30 , style},
        { header: 'HT', key: 'billTotalHT', width: 12 , style},
        { header: 'TVA', key: 'tvaAmount', width: 12 , style},
        { header: 'TTC', key: 'billTotalTTC', width: 12 , style},
        { header: 'Règlement', key: 'paidMethod', width: 20 , style}
    ];
    let rowIndex = 2;
    billList.forEach(bill => {
        let {billTotalHT, billTotalTTC, customerName, formattedDate, isPaid, paidMethod, number, billType} = bill.data
        let tvaAmount = billTotalTTC - billTotalHT
        sheet.addRow({customerName, formattedDate, number, billType, billTotalHT, tvaAmount, billTotalTTC, paidMethod})
        let row = sheet.getRow(rowIndex)
        row.font =  { name: 'Verdana', size:10, bold:false }
        for(let i=1; i<9; i++){
            formatCell(row, i, isPaid)
        }
        rowIndex++;
    })
    let fileName = __dirname +'/Test.xlsx'
    return workbook.xlsx.writeFile(fileName)
    .then(() =>{
        return fileName;
    });

}

function formatCell(row, cellNumber, isPaid){
    if(isPaid){
        row.getCell(cellNumber).fill = {
        type: 'pattern',
        pattern:'solid',
        fgColor:{argb:'FFFFFF00'},
        bgColor:{argb:'FF0000FF'}
    }
    }
    
}
module.exports = xlsService;
