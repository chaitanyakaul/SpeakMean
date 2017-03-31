var mongoose = require('mongoose');
var ModuleSchema = require('./module.schema.server');
var moduleModel = mongoose.model('ModuleModel', ModuleSchema);
var q = require('q');

var app = {
    createModule:createModule,
    updateModule:updateModule,
    deleteModule:deleteModule,
    findModuleById:findModuleById,
    findAllModules:findAllModules
};

module.exports = app;

function createModule(module) {
    var d= q.defer();
    moduleModel
        .create(module,
            function (err,module) {
                if(err){
                    d.reject(err)
                }else{
                    d.resolve(module)
                }
            });
    return d.promise;
}

function findAllModules(){
    var d = q.defer();
    moduleModel
        .find({},function (err,modules) {
            if(err){
                d.reject(err)
            }else{
                d.resolve(modules)
            }
        });
    return d.promise;
}

function updateModule(moduleId,module) {
    var d=q.defer();
    moduleModel
        .update({_id:moduleId},{$set:module},function (err,Status) {
            if(err){
                d.reject(err)
            }else{
                d.resolve(Status)
            }
        });
    return d.promise
}

function deleteModule(moduleId) {
    var d=q.defer();
    moduleModel
        .remove({_id:moduleId},function (err,status) {
            if(err){
                d.reject(err)
            }else{
                d.resolve(status)
            }
        });
    return d.promise
}

function findModuleById(moduleId) {
    var d = q.defer();
    moduleModel
        .find({_id:moduleId},function (err,module) {
            if(err){
                d.reject()
            }else{
                d.resolve(module)
            }
        });
    return d.promise
}