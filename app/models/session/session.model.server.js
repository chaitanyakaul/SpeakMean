module.exports = function (app) {
    var mongoose = require('mongoose');
    var SessionSchema = require('./session.schema.server')();
    var SessionModel = mongoose.model('SessionModel', SessionSchema);

    var api = {
        createSession: createSession,
        findAllSessions: findAllSessions,
        findAllSessionsByCaller: findAllSessionsByCaller,
        findAllSessionsByCalled: findAllSessionsByCalled
    };
    return api;

    function createSession(session) {
        return SessionModel.create(session);
    }
    
    function findAllSessions() {
        return SessionModel.find();
    }

    function findAllSessionsByCaller(caller) {
        return SessionModel.find({
            'caller._id': caller._id
        });
    }

    function findAllSessionsByCalled(called) {
        return SessionModel.find({
            'called._id': called._id
        });
    }
};