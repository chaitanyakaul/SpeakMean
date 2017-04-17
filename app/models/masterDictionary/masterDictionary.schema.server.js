var mongoose = require('mongoose');

var masterDictionarySchema = mongoose.Schema({
    name: String,
    language: String,
    date:{type:Date, default:Date.now()}
}, {collection: 'dictionary.master'});

module.exports = masterDictionarySchema;