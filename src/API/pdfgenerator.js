PDFDocument = require('pdfkit');

const moment = require('moment');

// Constructor
function PdfGenerator() { }

/**
 * Metodi di classe
 */

PdfGenerator.prototype.GenerateStatusReport = function(transactions, currentIban, balance) {
    if (transactions == null)
        return null;

    var doc = new PDFDocument({ margins: { left: 60, right: 60 } });

    var dateOffset = 60;
    var causeOffset = 150;
    var amountOffset = 480;
    var causeOptions = { width: 310, height: 30, ellipsis: true };
    var verticalOffset = 100;

    doc.image('Assets/cambank_icon.png', 55, 40, { width: 150 });

    doc.font('Helvetica-Bold').fontSize(14);
    doc.text("Data", dateOffset, verticalOffset);
    doc.text("Causale", causeOffset, verticalOffset);
    doc.text("Importo", amountOffset, verticalOffset);

    doc.font('Helvetica').fontSize(12);
    verticalOffset += 30;

    // 595.28, 841.89
    var rowsPerPage = Math.round(841.89 / 60);
    var numberOfPages = Math.ceil(transactions.length / rowsPerPage);

    for (var j=0; j<numberOfPages; j++)
    {
        for (var i=0; i<rowsPerPage && i<transactions.length; i++)
        {
            const date = moment(transactions[i].date).locale('it').format('DD/MM/YYYY');
            doc.text(date, dateOffset, verticalOffset);
            doc.text(transactions[i].cause, causeOffset, verticalOffset, causeOptions);
            const sign = (transactions[i].emitterIban === currentIban) ? "- " : "+ ";
            doc.text(sign + transactions[i].amount + " €", amountOffset, verticalOffset);
            verticalOffset += 40;
        }

        if (j + 1 < numberOfPages)
        {
            doc.addPage();
            verticalOffset = 80;
            transactions.splice(0, rowsPerPage);
        }
    }

    doc.moveTo(dateOffset, verticalOffset).lineTo(595.28 - dateOffset, verticalOffset).stroke();
    verticalOffset += 20;
    doc.font('Helvetica-Bold').text(balance, amountOffset, verticalOffset);
    return doc;
};


PdfGenerator.prototype.GenerateTransactionReport = function(transaction) {
    const titleXOffset = 50;
    const dataXOffset = 280;
    let yOffset = 40;

    var doc = new PDFDocument();

    doc.image('Assets/cambank_icon.png', titleXOffset, yOffset, { width: 150 });
    yOffset += 60;
    doc.fontSize(15).font('Helvetica-Bold').text("Dettagli transazione", titleXOffset, yOffset);
    yOffset += 40;
    
    doc.fontSize(12).font('Helvetica-Bold').text("Identificativo", titleXOffset, yOffset);
    doc.font('Helvetica').text(transaction._id, dataXOffset, yOffset);
    yOffset += 40;

    doc.font('Helvetica-Bold').text("Causale", titleXOffset, yOffset);
    doc.font('Helvetica').text(transaction.cause, dataXOffset, yOffset);
    yOffset += 40;

    if (transaction.cause === "Ricarica telefonica") {
        doc.font('Helvetica-Bold').text("Numero", titleXOffset, yOffset);
        doc.font('Helvetica').text(transaction.phoneNumber, dataXOffset, yOffset);
        yOffset += 40;
    } else if (transaction.cause === "Mav") {
        doc.font('Helvetica-Bold').text("Identificativo mav", titleXOffset, yOffset);
        doc.font('Helvetica').text(transaction.mavId, dataXOffset, yOffset);
        yOffset += 40;
    }

    doc.font('Helvetica-Bold').text("Data", titleXOffset, yOffset);
    doc.font('Helvetica').text(moment(transaction.date).locale('it').format('DD MMMM YYYY'), dataXOffset, yOffset);
    yOffset += 40;

    doc.font('Helvetica-Bold').text("Importo", titleXOffset, yOffset);
    doc.font('Helvetica').text(transaction.amount + " €", dataXOffset, yOffset);
    yOffset += 40;

    doc.font('Helvetica-Bold').text("Emesso da", titleXOffset, yOffset);
    doc.font('Helvetica').text(transaction.emitterIban, dataXOffset, yOffset);
    yOffset += 40;

    if (transaction.cause !== "Mav") {
        doc.font('Helvetica-Bold').text("Verso", titleXOffset, yOffset);
        doc.font('Helvetica').text(transaction.receiverIban, dataXOffset, yOffset);
        yOffset += 40;
    }    

    doc.font('Helvetica-Bold').text("Note", titleXOffset, yOffset);
    doc.font('Helvetica').text(transaction.notes, dataXOffset, yOffset);
    yOffset += 40;

    return doc;
}


module.exports = PdfGenerator;