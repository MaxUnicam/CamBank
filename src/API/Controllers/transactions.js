var BankTransaction = require('../Models/BankTransaction')

// TODO: Controllare che currentIban salvato nella richiesta matchi con l'iban emettitore o quello ricevente
// per una sicurezza maggiore

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
    var iban = req.currentIban;
    if (iban == null) {
        res.status(401).json('Non sei autenticato. Effettua il login per effettuare un bonifico.');
        return;
    }

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
    var iban = req.currentIban;
    if (iban == null) {
        res.status(401).json('Non sei autenticato. Effettua il login per effettuare una ricarica telefonica.');
        return;
    }

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
    var iban = req.currentIban;
    if (iban == null) {
        res.status(401).json('Non sei autenticato. Effettua il login per pagare un mav.');
        return;
    }

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
    var iban = req.currentIban;
    if (iban == null) {
        res.status(401).json('Non sei autenticato. Effettua il login per visualizzare le tue transazioni.');
        return;
    }
    
    BankTransaction.find({$or: [ { emitterIban: iban }, { receiverIban: iban } ] }, (error, transactions) => {
        if (error) {
            res.status(500).json(error);
            return;
        }
        
        res.status(200).json(transactions);
    });
}