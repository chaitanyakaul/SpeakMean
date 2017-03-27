var mongoose = require('mongoose');
var dictionarySchema = require('./dictionary.schema.server');
var dictionaryModel = mongoose.model('DictionaryModel', dictionarySchema);

var model = {
    createDictionary: createDictionary,
    findAllDictionaries: findAllDictionaries,
    setModel: setModel,
    findDictionaryById: FindDictionaryById,
    updateDictionary: updateDictionary
};

module.exports = model;

function setModel(_model){
    model = _model;
}

function createDictionary(dictionary) {
    return dictionaryModel.create(dictionary);
}

function findAllDictionaries() {
    return dictionaryModel.find({});
}


function FindDictionaryById(dictionaryId)
{
    console.log(dictionaryId);
    return dictionaryModel.find({_id:dictionaryId});

}



function updateDictionary(dictionaryId, dictionary)
{
    return dictionaryModel.update({_id:dictionaryId},{$set:dictionary});
}
