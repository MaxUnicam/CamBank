var BankTransaction = require('../Models/BankTransaction');
var PdfGenerator = require('../pdfgenerator.js');


exports.StatusReport = function(req, res) {
    var iban = req.currentIban;

    BankTransaction.find({$or: [ { emitterIban: iban }, { receiverIban: iban } ] }, (error, transactions) => {
        if (error) {
            res.status(500).json(error);
            return;
        }

        var generator = new PdfGenerator();
        var doc = generator.GenerateStatusReport(transactions);

        if (doc == null) {
            res.status(500);
            return;
        }
            
        doc.pipe(res);
        doc.end();
    });
}


exports.TransactionReport = function(req, res) {
    var id = req.params.id;

    BankTransaction.find({ "_id": id }, (error, transaction) => {
        if (error) {
            res.status(500).json(error);
            return;
        }
        
        if (transaction == null) {
            res.status(404).send("Transaction not found");
            return;
        }

        var generator = new PdfGenerator();
        var doc = generator.GenerateTransactionReport(transaction);

        if (doc == null) {
            res.status(500);
            return;
        }
            
        doc.pipe(res);
        doc.end();
    });
}