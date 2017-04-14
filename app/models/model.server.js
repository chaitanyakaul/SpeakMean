module.exports = function () {
    var userModel = require('./user/user.model.server');
    var sessionModel = require('./session/session.model.server');
    var dictionaryModel = require('./dictionary/dictionary.model.server');
    var masterDictionaryModel = require('./masterDictionary/masterDictionary.model.server');

    var model = {
        userModel: userModel,
        sessionModel: sessionModel,
        dictionaryModel: dictionaryModel,
        masterDictionaryModel: masterDictionaryModel
    };

    dictionaryModel.setModel(model);
    return model;
};