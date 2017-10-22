var User = require('../Models/user');


exports.UserIban = function(req, res) {
    if (!req.currentIban) {
        res.status(403).send('Nessun token passato nella richiesta');
        return;
    }

    res.status(200).json(req.currentIban);
}


exports.UserDetail = function(req, res) {
    if (!req.currentIban) {
        res.status(403).send('Nessun token passato nella richiesta');
        return;
    }

    User.findOne( { iban: req.currentIban }, (error, user) => {
        if (error || !user) {
            res.status(404).send("Utente non trovato");
            return;
        }

        res.status(200).json(user);
    });
}


exports.EditProfile = function(req, res) {
    if (!req.currentIban) {
        res.status(403).send('Nessun token passato nella richiesta');
        return;
    }

    var body = req.body;
    var newUsername = body.username;

    User.findOne( { name: newUsername }, (error, oldUser) => {
        if (oldUser) {
            res.status(409).send();
            return;
        }

        User.update( { iban: req.currentIban }, { $set: { name: newUsername } }, (error, result) => {
            if (error) {
                res.status(404).send();
                return;
            }
            
            res.status(200).json(result);
        });
    });
}


exports.Operators = function(req, res) {
    if (!req.currentIban) {
        res.status(403).send('Nessun token passato nella richiesta');
        return;
    }

    User.find( { isOperator: true }, (error, operators) => {
        if (error) {
            res.status(500).send("Errore di lettura");
            return;
        }
        res.status(200).json(operators);            
    });
}