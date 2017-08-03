var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('BankTransaction', new Schema({
    emitterIban: String,
    receiverIban: String,
    cause: String,
    notes: String,
    amount: mongoose.Schema.Types.Decimal128,
    date: Date
}));