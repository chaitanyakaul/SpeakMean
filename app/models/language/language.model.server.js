/**
 * Created by niharikasharma on 4/10/17.
 */

var mongoose = require('mongoose');
var LanguageSchema = require('./language.schema.server');
var languageModel = mongoose.model('LanguageModel', LanguageSchema);
var q = require('q');

var app = {
    createLanguage:createLanguage,
    updateLanguage:updateLanguage,
    deleteLanguage:deleteLanguage,
    findLanguageById:findLanguageById,
    findAllLanguages:findAllLanguages
};

module.exports = app;

function createLanguage(language) {
    var d= q.defer();
    languageModel
        .create(language,
            function (err,language) {
                if(err){
                    d.reject(err)
                }else{
                    d.resolve(language)
                }
            });
    return d.promise;
}

function findAllLanguages(){
    var d = q.defer();
    languageModel
        .find({},function (err,languages) {
            if(err){
                d.reject(err)
            }else{
                d.resolve(languages)
            }
        });
    return d.promise;
}

function updateLanguage(languageId,language) {
    var d=q.defer();
    languageModel
        .update({_id:languageId},{$set:language},function (err,Status) {
            if(err){
                d.reject(err)
            }else{
                d.resolve(Status)
            }
        });
    return d.promise
}

function deleteLanguage(languageId) {
    var d=q.defer();
    languageModel
        .remove({_id:languageId},function (err,status) {
            if(err){
                d.reject(err)
            }else{
                d.resolve(status)
            }
        });
    return d.promise
}

function findLanguageById(languageId) {
    var d = q.defer();
    languageModel
        .find({_id:languageId},function (err,language) {
            if(err){
                d.reject()
            }else{
                d.resolve(language)
            }
        });
    return d.promise
}
