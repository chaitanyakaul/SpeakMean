var mongoose = require('mongoose');
var dictionarySchema = require('./dictionary.schema.server');
var dictionaryModel = mongoose.model('DictionaryModel', dictionarySchema);

var model = {
    createDictionary: createDictionary,
    findAllDictionary: findAllDictionary
};

module.exports = model;

function createDictionary(dictionary) {

}

function findAllDictionary() {

}
