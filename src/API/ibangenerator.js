var crypto = require('crypto');

const uuidv1 = require('uuid/v1');

// Constructor
function IbanGenerator() { 
    this.ISOCountryCode = "IT";
    this.BankId = "01106"; // Identificativo della banca, inventato
    this.BranchId = "01995"; // Identificativo della filiale della banca, fisso nel nostro caso
}

/**
 * Metodi di classe
 * 
 * La generazione dell'iban è pseudo-realistica. Generiamo un iban della stessa
 * lunghezza degli iban reali, con la stessa struttura, ma i singoli componenti 
 * sono fittizi o costruiti in modo non uguale a quelli reali
 */

IbanGenerator.prototype.GenerateNewIban = function() {
    let accountNumber = uuidv1().toString().toUpperCase();
    // Elimino caratteri che potrebbero essere generati ma non sono ammessi negli iban
    accountNumber = replaceAll(accountNumber, '-', '');
    accountNumber = accountNumber.substring(0, 12);
    let iban = this.BankId + this.BranchId + accountNumber;
    const bbanCheckDigit = calculateChecksum(iban, 1);
    iban = bbanCheckDigit + iban;
    const ibanCheckDigit = calculateChecksum(iban);
    iban = this.ISOCountryCode + ibanCheckDigit + iban;
    return iban.toUpperCase();
}


/**
 * Metodi di utilità
 */

 calculateChecksum = function(payload, chars = 2) {
    var shasum = crypto.createHash('sha1');
    shasum.update(payload);
    const checksum = shasum.digest('hex');
    return checksum.substring(0, chars);
 }
 
replaceAll = function(data, search, replacement) {
    return data.split(search).join(replacement);
};

module.exports = IbanGenerator