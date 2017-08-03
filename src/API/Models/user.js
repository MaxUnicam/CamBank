var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({ 
    iban: String,
    name: String, 
    password: String,
    email: String,
    registrationDate: Date
}));