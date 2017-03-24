module.exports = function () {
    var userModel = require('./user/user.model.server')();
    var sessionModel = require('./session/session.model.server')();
    var model = {
        userModel: userModel,
        sessionModel: sessionModel
    };
    return model;
};