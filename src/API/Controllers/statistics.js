var BankTransaction = require('../Models/BankTransaction')


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
        { $match : { $and : [ { emitterIban: iban }, { cause : "Ricarica telefonica" } ] } },
        { $group : { _id : null, charge: { $sum : 1 } } }
    ],
    (chargeEr, charge) => {
        
        BankTransaction.aggregate([
            { $match : { $and : [ { emitterIban: iban }, { cause : "Mav" }] } },
            { $group : { _id : null, mav: { $sum : 1 } } }
        ], 
        (mavEr, mav) => {

            BankTransaction.aggregate([
                { $match : { $and : [ { emitterIban: iban }, { cause : "Bonifico" } ] } },
                { $group : { _id : null, transaction: { $sum : 1 } } }
            ], 
            (transEr, trans) => {

                if (chargeEr || mavEr || transEr) {
                    res.status(500).json("Errore");
                    return;
                }

                const stats = { 
                    charge: (charge !== undefined && charge !== null) ? charge[0].charge : 0, 
                    mav: (mav !== undefined && mav !== null) ? mav[0].mav : 0,
                    transaction: (trans !== undefined && trans !== null) ? trans[0].transaction : 0
                 }

                res.status(200).json(stats);
            });
        });
        
    });
}