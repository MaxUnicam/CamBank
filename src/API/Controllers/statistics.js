var BankTransaction = require('../Models/banktransaction')


/**
 * Recupero del dettaglio di una transizione
 */

exports.Outgoings = function(req, res) {
    var iban = req.currentIban;
    if (iban == null) {
        res.status(401).send("No token provided");
        return;
    }

    BankTransaction.aggregate([
        { $match : { $and : [ { emitterIban: iban }, { cause : "Ricarica telefonica" }] } },
        { $group : { _id : null, charge: { $sum : "$amount" } } }
    ],
    (chargeEr, charge) => {
        BankTransaction.aggregate([
            { $match : { $and : [ { emitterIban: iban }, { cause : "Mav" }] } },
            { $group : { _id : null, mav: { $sum : "$amount" } } }
        ], 
        (mavEr, mav) => {

            BankTransaction.aggregate([
                { $match : { $and : [ { emitterIban: iban }, { cause : "Bonifico" } ] } },
                { $group : { _id : null, transaction: { $sum : "$amount" } } }
            ], 
            (transEr, trans) => {

                if (chargeEr || mavEr || transEr) {
                    res.status(500).json("Errore");
                    return;
                }

                const stats = { 
                    charge: (charge !== undefined && charge.length > 0) ? charge[0].charge : 0, 
                    mav: (mav !== undefined && mav.length > 0) ? mav[0].mav : 0,
                    transaction: (trans !== undefined && trans.length > 0) ? trans[0].transaction : 0
                 }

                res.status(200).json(stats);
            });
        });
        
    });
}