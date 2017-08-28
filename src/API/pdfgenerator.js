PDFDocument = require('pdfkit');

// Constructor
function PdfGenerator() { }

/**
 * Metodi di classe
 */

PdfGenerator.prototype.GenerateStatusReport = function(transactions) {
    if (transactions == null)
        return null;

    var doc = new PDFDocument({ margins: { left: 60, right: 60 } });

    var dateOffset = 60;
    var causeOffset = 150;
    var amountOffset = 480;
    var causeOptions = { width: 310, height: 30, ellipsis: true };
    var verticalOffset = 120;

    doc.fontSize(14);
    doc.text("Data", dateOffset, 80);
    doc.text("Causale", causeOffset, 80);
    doc.text("Importo", amountOffset, 80);

    doc.fontSize(12);

    // 595.28, 841.89
    var rowsPerPage = Math.round(841.89 / 70);
    var numberOfPages = Math.ceil(transactions.length / rowsPerPage);

    for (var j=0; j<numberOfPages; j++)
    {
        var x = transactions.length;
        for (var i=0; i<rowsPerPage && i<x; i++)
        {
            doc.text(transactions[i].date, dateOffset, verticalOffset);
            doc.text(transactions[i].cause, causeOffset, verticalOffset, causeOptions);
            doc.text(transactions[i].amount + " €", amountOffset, verticalOffset);
            verticalOffset += 50;
        }

        if (j + 1 < numberOfPages) 
        {
            doc.addPage();
            verticalOffset = 80;
            transactions.splice(0, rowsPerPage);
        }
    }
    
    return doc;
};


PdfGenerator.prototype.GenerateTransactionReport = function(transaction) {
    var doc = new PDFDocument();
    doc.text(transaction.cause);
    return doc;
}


module.exports = PdfGenerator;



// var transactions =
//     [
//         { date: "11/06/2012", text: "Ciaadoasldallasd"},
//         { date: "09/07/2006", text: "Italia campione del mondo"},
//         { date: "11/06/1995", text: "Nasce lu boss"},
//         { date: "11/06/2012", text: "Ciaadoasldallasd"},
//         { date: "09/07/2006", text: "Italia campione del mondo"},
//         { date: "11/06/1995", text: "Nasce lu boss"},
//         { date: "11/06/2012", text: "Ciaadoasldallasd"},
//         { date: "09/07/2006", text: "Italia campione del mondo"},
//         { date: "11/06/1995", text: "Nasce lu boss"},
//         { date: "11/06/2012", text: "Ciaadoasldallasd"},
//         { date: "09/07/2006", text: "Italia campione del mondo"},
//         { date: "11/06/1995", text: "Nasce lu boss"},
//         { date: "11/06/2012", text: "Ciaadoasldallasd"},
//         { date: "09/07/2006", text: "Italia campione del mondo"},
//         { date: "11/06/1995", text: "Nasce lu boss"},
//         { date: "11/06/2012", text: "Ciaadoasldallasd"},
//         { date: "09/07/2006", text: "Italia campione del mondo"},
//         { date: "11/06/1995", text: "Nasce lu boss"},
//         { date: "11/06/2012", text: "Ciaadoasldallasd"},
//         { date: "09/07/2006", text: "Italia campione del mondo"},
//         { date: "11/06/1995", text: "Nasce lu boss"},
//         { date: "11/06/2012", text: "Ciaadoasldallasd"},
//         { date: "09/07/2006", text: "Italia campione del mondo"},
//         { date: "11/06/1995", text: "Nasce lu boss"},
//         { date: "11/06/2012", text: "Ciaadoasldallasd"},
//         { date: "09/07/2006", text: "Italia campione del mondo"},
//         { date: "11/06/1995", text: "Nasce lu boss"},
//         { date: "11/06/2012", text: "Ciaadoasldallasd"},
//         { date: "09/07/2006", text: "Italia campione del mondo"},
//         { date: "11/06/1995", text: "Nasce lu boss"}
//     ];