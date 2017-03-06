
module.exports = function(app) {

    var userService = require("./services/user/user.service.server.js")(app);
    var activityService = require('./services/activity.service.server')(app);
    var moduleService = require('./services/module.service.server')(app);
    var languageService = require('./services/language.service.server')(app);

}