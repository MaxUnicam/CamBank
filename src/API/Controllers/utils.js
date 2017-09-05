var User = require('../Models/User');

exports.UserIban = function(req, res) {
    if (!req.currentIban) {
        res.status(403).send('Nessun token passato nella richiesta');
        return;
    }

    res.status(200).json(req.currentIban);
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