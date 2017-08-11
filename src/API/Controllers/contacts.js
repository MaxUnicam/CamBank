var Contact = require('../Models/Contact');


exports.Add = function(req, res) {
    var body = req.body;
    var contact = new Contact();
    contact.iban = body.iban;
    contact.name = body.name;
    contact.ownerIban = req.currentIban;

    contact.save((error) => {
        if (error != null)
            res.status(500).send("Errore di scrittura");
        else
            res.status(200).send(contact);
    });        
}



exports.List = function(req, res) {
    var body = req.body;
    var currentIban = req.currentIban;
    Contact.find( { ownerIban: currentIban }, (error, contacts) => {
        if (error != null) {
            res.status(500);
            return;
        }

        res.status(200).send(contacts);
    });
}


exports.Update = function(req, res) {
    var iban = req.params.iban;
    if (iban == null) {
        res.status(400).send("No iban specified in the request.");
        return;
    }

    var body = req.body;
    var newContact = 
    {
        iban: body.newIban,
        name: body.name,
        ownerIban: req.currentIban
    };

    
    Contact.findOneAndUpdate({ iban: iban }, newContact, (error, contact) => {
        if (error) {
            res.status(500).send(error);
            return;
        }

        res.status(200).send(contact);
    });
}



exports.Delete = function(req, res) {
    var iban = req.params.iban;
    if (iban == null) {
        res.status(400).send("No id specified in the request.");
        return;
    }

    Contact.findOneAndRemove({ iban: iban }, (error, contact) => {
        if (error) {
            res.status(500).send(error);
            return;
        }

        res.status(200).send(contact);
    });
}