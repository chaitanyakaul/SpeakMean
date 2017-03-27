
module.exports = function(app) {
    var sessionService = require('./services/session.service.server.js')(app);
    var userService = require("./services/user/user.service.server.js")(app);
    var activityService = require('./services/activity.service.server')(app);
    var moduleService = require('./services/module.service.server')(app);
    var languageService = require('./services/language.service.server')(app);
    var TranscriptModel= require('./models/transcript/transcript.model.server')();
    var transcriptService = require('./services/transcript/transcript.service.server')(app, TranscriptModel);


    var model = require('./models/model.server')();
    require('./services/dictionary.service.server')(app, model.dictionaryModel);
    require('./services/word.service.server')(app,model.dictionaryModel);


};