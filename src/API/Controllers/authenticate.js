var User = require('../Models/User');
var config = require('../config');

var jwt = require('jsonwebtoken');


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
            expiresIn: 60 * 60 * 2, // expires in 2 hours
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
    // italian iban format
    // http://www.xe.com/ibancalculator/sample/?ibancountry=italy
}