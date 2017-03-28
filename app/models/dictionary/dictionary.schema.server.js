var mongoose = require('mongoose');

var dictionarySchema = mongoose.Schema({
    name: String,
    vocabulary: [String]
}, {collection: 'dictionary'});

module.exports = dictionarySchema;