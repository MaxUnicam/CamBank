var BankTransaction = require('../Models/BankTransaction')


exports.Detail = function(req, res) {
    var transactionId = req.params.id;
    BankTransaction.find({ "_id": transactionId }, (error, transaction) => {
        if (error) {
            res.status(500).json(error);
            return;
        }
        
        if (transaction == null) {
            res.status(404).send("Transaction not found");
            return;
        }

        res.status(200).json(transaction);
    });
}


exports.Create = function(req, res) {
    var body = req.body;
    var transaction = new BankTransaction();

    transaction.emitterIban = body.emitterIban;
    transaction.receiverIban = body.receiverIban;
    transaction.cause = body.cause;
    transaction.notes = body.notes;
    transaction.amount = body.amount;
    transaction.date = body.date;

    transaction.save((error) => {
        if (error != null)
            res.status(500).send("Errore di scrittura");
        else
            res.status(200).send(transaction);
    });
}


exports.GetIbanTransactions = function(req, res) {
    var iban = req.params.id;
    BankTransaction.find({$or: [ { emitterIban: iban }, { receiverIban: iban } ] }, (error, transactions) => {
        if (error) {
            res.status(500).json(error);
            return;
        }
        
        res.status(200).json(transactions);
    });
}