var User = require('./Models/user');

var crypto = require('crypto');

// Constructor
function Utils() { }

Utils.prototype.AddDefaultOperators = function() {
    const operators = 
    [
        { iban:'IT16N0306905073000000610115', name:'Tim', password:'AMb3EYPNre', email:'info@tim.it', registrationDate:Date.now(), isOperator:true },
        { iban:'IT69W0306909400100000008461', name:'Vodafone', password:'nwPtZ6Ty9T', email:'info@vodafone.it', registrationDate:Date.now(), isOperator:true },
        { iban:'IT72B0311101665000000021708', name:'Tre', password:'j72ubtRV4P', email:'info@tre.it', registrationDate:Date.now(), isOperator:true },
    ];

    operators.forEach((item) => {
        User.findOne( { iban: item.iban }, (error, operator) => {
            if (!error && operator)
                return;

            operator = new User();
            operator.iban = item.iban;
            operator.name = item.name;
            operator.password = CalculateSha1(item.password);
            operator.email = item.email;
            operator.registrationDate = item.date;
            operator.isOperator = true;
            operator.save((error) => {
                if (error)
                    console.log(error);
            });
        })
    }, this);
}

function CalculateSha1(data) {
    shasum = crypto.createHash('sha1')
    shasum.update(data)
    return shasum.digest('hex')
}

module.exports = Utils;