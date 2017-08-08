var BankTransaction = require('../Models/BankTransaction')

/**
 * Recupero del dettaglio di una transizione
 */
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


/**
 * Aggiunta di transazioni: bonifici, ricariche ecc.
 */

function GetTransactionFromBody(body, cause) {
    var transaction = new BankTransaction();
    transaction.emitterIban = body.emitterIban;
    transaction.receiverIban = body.receiverIban;
    transaction.notes = body.notes;
    transaction.amount = body.amount;
    transaction.date = body.date;
    transaction.cause = cause;
    return transaction;
}


exports.AddTransfer = function(req, res) {
    var body = req.body;
    var transaction = GetTransactionFromBody(body, "Bonifico");
    transaction.save((error) => {
        if (error != null)
            res.status(500).send("Errore di scrittura");
        else
            res.status(200).send(transaction);
    });
}


exports.AddPhoneCharging = function(req, res) {
    var body = req.body;
    var transaction = GetTransactionFromBody(body, "Ricarica telefonica");
    transaction.save((error) => {
        if (error != null)
            res.status(500).send("Errore di scrittura");
        else
            res.status(200).send(transaction);
    });
}

exports.AddMav = function(req, res) {
    var body = req.body;
    var transaction = GetTransactionFromBody(body, "Mav");
    transaction.save((error) => {
        if (error != null)
            res.status(500).send("Errore di scrittura");
        else
            res.status(200).send(transaction);
    });
}


/**
 * Lista delle transazioni per account
 */
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