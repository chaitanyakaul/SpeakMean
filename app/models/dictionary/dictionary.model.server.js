var mongoose = require('mongoose');
var dictionarySchema = require('./dictionary.schema.server');
var dictionaryModel = mongoose.model('DictionaryModel', dictionarySchema);

var model = {
    createDictionary: createDictionary,
    findAllDictionaries: findAllDictionaries,
    setModel: setModel,
    findDictionaryById: FindDictionaryById,
    updateDictionary: updateDictionary,
    deleteDictionary: deleteDictionary,
    createWord: createWord,
    findAllWordsByDictionaryId: findAllWordsByDictionaryId,
    deleteWordFromDictionary: deleteWordFromDictionary,
    updateWord: updateWord,
    createWordFromCallBack: createWordFromCallBack

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
    //hello
}


function FindDictionaryById(dictionaryId)
{
    console.log(dictionaryId);
    return dictionaryModel.find({_id:dictionaryId});

}


function deleteDictionary(dictionaryId)
{
    return dictionaryModel.remove({_id:dictionaryId});

}


function updateWord(dictionaryId, word, word_new)
{

 return dictionaryModel.update({_id:dictionaryId, vocabulary:word});


}


function updateDictionary(dictionaryId, dictionary)
{
    return dictionaryModel.update({_id:dictionaryId},{$set:dictionary});
}


function createWord(dictionaryId, word)
{
    var word1 = word.name;
    var vocab = dictionaryModel.find({_id: dictionaryId});
    console.log(vocab);
    return dictionaryModel.update({_id:dictionaryId},{$push: {vocabulary:word1}})
}


function createWordFromCallBack(dictionaryId, word)
{
    return dictionaryModel.update({_id:dictionaryId},{$push: {vocabulary:word}})
}

function deleteWordFromDictionary(dictionaryId, word)
{
    return dictionaryModel.update({_id:dictionaryId},{$pull: {vocabulary:word}})
}


function findAllWordsByDictionaryId(dictionaryId) {
     return dictionaryModel.find({_id: dictionaryId});
}