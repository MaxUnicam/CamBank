var BankTransaction = require('../Models/BankTransaction')


exports.Detail = function(req, res) {
    res.status(200).send("I should return the transaction details, if it exists.");
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