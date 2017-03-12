module.exports = function () {
    var mongoose = require('mongoose');

    var SessionSchema = mongoose.Schema({
        started: {type: Date, default: Date.now},
        ended:   {type: Date, default: Date.now},
        caller:  {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
        called:  {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}
    }, {collection: 'session'});

    return SessionSchema;
};