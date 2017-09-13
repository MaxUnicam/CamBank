var BankTransaction = require('../Models/BankTransaction');
var PdfGenerator = require('../pdfgenerator.js');

var Decimal = require('decimal.js');


exports.StatusReport = function(req, res) {
    var iban = req.currentIban;

    BankTransaction.find({ $or: [{ emitterIban: iban }, { receiverIban: iban }] }).sort('date').exec((error, transactions) => {
        if (error) {
            res.status(500).json(error);
            return;
        }

        const generator = new PdfGenerator();
        const iban = req.currentIban;
        Balance(iban, (balance) => {
            var doc = generator.GenerateStatusReport(transactions, iban, balance);

            if (doc == null) {
                res.status(500);
                return;
            }
                
            doc.pipe(res);
            doc.end();
        });
    });
}


exports.TransactionReport = function(req, res) {
    var id = req.params.id;

    BankTransaction.find({ "_id": id }, (error, transactions) => {
        if (error) {
            res.status(500).json(error);
            return;
        }
        
        if (transactions == null) {
            res.status(404).send("Transaction not found");
            return;
        }

        var generator = new PdfGenerator();
        var doc = generator.GenerateTransactionReport(transactions[0]);

        if (doc == null) {
            res.status(500);
            return;
        }
            
        doc.pipe(res);
        doc.end();
    });
}


function Balance(iban, callback) {
    BankTransaction.aggregate([
        { $match : { receiverIban: iban } },
        { $group : { _id : null, total : { $sum : "$amount" } } }
    ],
    (incomesErr, incomes) => {
       if (incomesErr) {
           res.status(500).json(error);
           return;
       }

        BankTransaction.aggregate([
            { $match : { emitterIban: iban } },
            { $group : { _id : null, total : { $sum : "$amount" } } }
        ],
        (outcomesErr, outcomes) => {
            if (outcomesErr) {
                res.status(500).json(error);
                return;
            }
            
            let totalIncomes = new Decimal('0');
            if (incomes[0] != null && incomes[0].total != null)
                totalIncomes = new Decimal(incomes[0].total.toString());

            let totalOutcomes = new Decimal('0');
            if (outcomes[0] != null && outcomes[0].total != null)
                totalOutcomes = new Decimal(outcomes[0].total.toString());

            const balance = totalIncomes.minus(totalOutcomes);
            callback(balance + ' €');
        });
    })
}