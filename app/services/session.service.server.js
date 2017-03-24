module.exports = function (app) {
    var sessionModel = require('../models/session/session.model.server')();
    app.post('/api/session', createSession);
    app.get ('/api/session', findAllSessions);
    app.get ('/api/session/called/:calledId', findAllSessionsByCalled);
    app.get ('/api/session/caller/:callerId', findAllSessionsByCaller);
    app.get ('/api/session/user/:userId', findAllSessionsByUser);

    function findAllSessionsByUser(req, res) {
        var userId = req.params.userId;
        sessionModel
            .findAllSessionsByUser(userId)
            .then(function (sessions) {
                res.json(sessions);
            }, function (error) {
                console.log(error);
                res.sendStatus(500).send(error);
            });
    }

    function createSession(req, res) {
        var session = req.body;
        sessionModel
            .createSession(session)
            .then(function (session) {
                res.send(200);
            }, function (error) {
                res.sendStatus(500).send(error);
            })
    }

    function findAllSessions(req, res) {
        sessionModel
            .findAllSessions()
            .then(function (sessions) {
                res.json(sessions);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function findAllSessionsByCalled(req, res) {
        var calledId = req.params.calledId;
        sessionModel
            .findAllSessionsByCalled(calledId)
            .then(function (sessions) {
                res.json(sessions);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function findAllSessionsByCaller(req, res) {
        var callerId = req.params.callerId;
        sessionModel
            .findAllSessionsByCaller(callerId)
            .then(function (sessions) {
                res.json(sessions);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }
};