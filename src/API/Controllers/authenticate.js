var User = require('../Models/user');
var config = require('../config');

var jwt = require('jsonwebtoken');
var crypto = require('crypto');

var IbanGenerator = require('../ibangenerator.js');


exports.Authenticate = function(req, res) {
    const username = req.body.name;
    const password = req.body.password;
    if (username == null || password == null) {
        res.status(400).json({ success: false, message: 'Both username and password are required.' });
        return;
    }

    User.findOne({ $or: [{ name: req.body.name }, { email: req.body.name }] }, function(err, user) {
        if (err)
            throw err;

        if (!user) {
            res.status(401).json({ success: false, message: 'Authentication failed. User not found.' });
            return;
        }

        const password = CalculateSha1(req.body.password);
        if (user.password != password) {
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

    User.findOne({ $or: [{ name: body.name }, { email: body.email }] }, (error, contact) => {
        if (contact) {
            res.status(500).json({ success: false, message: "There already is an user with this mail address." });
            return;
        } else {
            const password = CalculateSha1(body.password);
            if (!password || !body.email) {
                res.status(500).json({ success: false, message: "Password and mail address are required." });
                return;
            }

            const ibanGenerator = new IbanGenerator();
            const user = new User();
            user.iban = ibanGenerator.GenerateNewIban();
            user.name = body.name;
            user.email = body.email;
            user.password = password;
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
    });
}


function CalculateSha1(data) {
    shasum = crypto.createHash('sha1')
    shasum.update(data)
    return shasum.digest('hex')
}