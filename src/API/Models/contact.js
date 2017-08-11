var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactSchema = new Schema({
    iban: { type: String, required: true },
    name:  { type: String, required: true },
    ownerIban: { type: String, required: true }
});

module.exports = mongoose.model('Contact', contactSchema);