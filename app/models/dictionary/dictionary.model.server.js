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
    createWordFromCallBack: createWordFromCallBack,
    addWordList:addWordList,
    updateWords: updateWords
};

module.exports = model;

function updateWords(dictionaryId, words) {
    return dictionaryModel.update(
        {_id:dictionaryId}, {
            $push: {
                vocabulary:
                {$each: words}
            }
        });
}

function addWordList(list, dictionaryId) {
   return dictionaryModel.update({_id:dictionaryId},{$set: {word:list}});
}

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
    return dictionaryModel.findById(dictionaryId);

}


function deleteDictionary(dictionaryId)
{
    return dictionaryModel.remove({_id:dictionaryId});

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