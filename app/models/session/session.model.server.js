var mongoose = require('mongoose');
var SessionSchema = require('./session.schema.server')();
var SessionModel = mongoose.model('SessionModel', SessionSchema);

var api = {
    createSession: createSession,
    findAllSessions: findAllSessions,
    findAllSessionsByCaller: findAllSessionsByCaller,
    findAllSessionsByCalled: findAllSessionsByCalled,
    findAllSessionsByLearner: findAllSessionsByLearner,
    findAllSessionsByCoach: findAllSessionsByCoach,
    findAllSessionsByUser: findAllSessionsByUser,
    findSessionById: findSessionById,
    updateSession: updateSession
};
module.exports = api;

function updateSession(sessionId, session) {
    return SessionModel.update({_id: sessionId}, {$set: session});
}

function createSession(session) {
    return SessionModel.create(session);
}

function findSessionById(sessionId) {
    return SessionModel
        .findById(sessionId)
        .populate('caller',  'username')
        .populate('called',  'username')
        .populate('learner', 'username')
        .populate('coach',   'username')
        .populate('module', 'name')
        .exec();
}

function findAllSessions() {
    return SessionModel.find();
}

function findAllSessionsByUser(userId) {
    return SessionModel
        .find({
            $or: [{'caller': userId}, {'called': userId}]
        })
        .populate('caller',  'username firstName lastName')
        .populate('called',  'username firstName lastName')
        .populate('learner', 'username firstName lastName')
        .populate('coach',   'username firstName lastName')
        .populate('module', 'name')
        .sort({'ended': -1})
        .exec();
}

function findAllSessionsByCaller(callerId) {
    return SessionModel.find({
        'caller': callerId
    });
}

function findAllSessionsByCalled(calledId) {
    return SessionModel.find({
        'called': calledId
    });
}

function findAllSessionsByLearner(userId) {
    return SessionModel.find({
        'learner': userId
    });
}

function findAllSessionsByCoach(userId) {
    return SessionModel.find({
        'coach': userId
    });
}
