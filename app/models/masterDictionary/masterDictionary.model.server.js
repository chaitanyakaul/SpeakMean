var mongoose = require('mongoose');
var masterDictionarySchema = require('./masterDictionary.schema.server');
var masterDictionaryModel = mongoose.model('MasterDictionaryModel', masterDictionarySchema);
var q= require('q');
var model = {
    findAllWords:findAllWords,
    addWord:addWord,
    deleteWord:deleteWord,
    updateWord:updateWord,
    sortWidget:sortWidget
};

module.exports = model;

function sortWidget(index1,index2,Id) {

    var pageModel=require('../page/page.model.server');
    var deferred = q.defer();
    masterDictionaryModel
    return deferred.promise;
}

function updateWord(id,word) {
    var deferred = q.defer();
    console.log("mdd "+word.name+" id "+id);
    masterDictionaryModel
        .update({_id:id}, {$set:word}, function(err,word){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(word);
            }
        });
    return deferred.promise;
}
function findAllWords() {
    var deferred = q.defer();
    console.log("md");
    masterDictionaryModel
        .find({}, function (err,words) {
            if(err){
                deferred.reject(err);
            }else {
                deferred.resolve(words);
            }
        });

    return deferred.promise;
}

function addWord(word) {
    return masterDictionaryModel.create(word)
}
function deleteWord(word)
{
    var deffered = q.defer();
    masterDictionaryModel
        .findByIdAndRemove({_id:word._id}, function (err,word) {
            if(err){
                deffered.reject(err);
            }
            else {
                word.remove();
                deffered.resolve(word);
            }
        });
    return deffered.promise;
}

