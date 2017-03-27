module.exports = function () {
    var userModel = require('./user/user.model.server');
    var sessionModel = require('./session/session.model.server');
    var dictionaryModel = require('./dictionary/dictionary.model.server');
    var model = {
        userModel: userModel,
        sessionModel: sessionModel,
        dictionaryModel: dictionaryModel
    };

    dictionaryModel.setModel(model);
    return model;
};