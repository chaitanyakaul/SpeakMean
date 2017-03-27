var express       = require('express');
var app           = express();
var bodyParser    = require('body-parser');
var multer        = require('multer'); 
var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var mongoose      = require('mongoose');

var connectionString = 'mongodb://127.0.0.1:27017/speak-app';

var mlabUsername = process.env.MONGOLAB_USERNAME;
var mlabPassword = process.env.MONGOLAB_PASSWORD;
if(mlabUsername && mlabPassword) {
    connectionString = 'mongodb://'+mlabUsername+':'+mlabPassword+'@ds151018.mlab.com:51018/heroku_13mhwkq8'
}
mongoose.connect(connectionString);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
multer();
app.use(session({
    secret: 'this is the secret',
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

require("./app/app.js")(app);
//require("./app/twilio")(app);

app.listen(process.env.PORT || 3000);