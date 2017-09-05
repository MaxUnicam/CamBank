var User = require('../Models/User');
var config = require('../config');

var jwt = require('jsonwebtoken');

var IbanGenerator = require('../ibangenerator.js');


exports.Authenticate = function(req, res) {
    const username = req.body.name;
    const password = req.body.password;
    if (username == null || password == null) {
        res.status(400).json({ success: false, message: 'Both username and password are required.' });
        return;
    }

    User.findOne({ name: req.body.name }, function(err, user) {
        if (err)
            throw err;

        if (!user) {
            res.status(401).json({ success: false, message: 'Authentication failed. User not found.' });
            return;
        }

        if (user.password != req.body.password) {
            res.status(401).json({ success: false, message: 'Authentication failed. Wrong password.' });
            return;
        }
        
        // Credenziali verificate, generiamo un token
        var token = jwt.sign(user, config.secret, {
            expiresIn: 60 * 60 * 4, // expires in 4 hours
            // algorithm: 'RS256'
        });

        // return the information including token as JSON
        res.json({
            success: true,
            token: token
        });
    });
}


exports.Register = function(req, res) {
    var body = req.body;
    if (!body.password || !body.email) {
        res.status(400).json({ success: false, message: "Password and one from name and email are required!" });
        return;
    }   

    const ibanGenerator = new IbanGenerator();

    const user = new User();
    user.iban = ibanGenerator.GenerateNewIban();
    user.name = body.name;
    user.email = body.email;
    user.password = body.password;
    user.registrationDate = new Date();
    user.isOperator = false;

    user.save((error) => {
        if (error != null) {
            res.status(500).json("Errore di scrittura");
            return;
        }
         
        res.status(200).json(user);
    });

}