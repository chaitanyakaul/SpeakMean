var mongoose = require('mongoose');
var moduleSchema = mongoose.Schema({
    name: String,
    vocabulary: [String],
    topics: [String],
    grammar: [String]
}, {collection : 'module'});

module.exports = moduleSchema;