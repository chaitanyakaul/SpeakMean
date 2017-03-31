module.exports = function () {
    var mongoose = require('mongoose');

    var SessionSchema = mongoose.Schema({
        started: {type: Date, default: Date.now},
        ended:   {type: Date, default: Date.now},
        caller:  {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
        called:  {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
        language: String,
        module: {type: mongoose.Schema.Types.ObjectId, ref: 'ModuleModel'},
        message: String,
        learnerRating: { // learner rates the following attributes
            coachRating: Number,
            moduleRating: Number,
            technicalQuality: Number,
            favorite: Boolean
        },
        coachRating: { // coach rates the following attributes
            learnerEffort: Number,
            learnerSkill: Number,
            learnerSpeaking: Number,
            learnerListening: Number,
            technicalQuality: Number

        }
    }, {collection: 'session'});

    return SessionSchema;
};