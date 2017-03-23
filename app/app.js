
module.exports = function(app) {

    var moduleModel = require('./models/module/module.model.server');

    var sessionService = require('./services/session.service.server.js')(app);
    var userService = require("./services/user/user.service.server.js")(app);
    var activityService = require('./services/activity.service.server')(app);
    var moduleService = require('./services/module.service.server')(app,moduleModel);
    var languageService = require('./services/language.service.server')(app);

};