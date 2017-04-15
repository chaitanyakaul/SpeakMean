var mongoose      = require("mongoose");

module.exports = function() {

    var UserSchema = new mongoose.Schema(
        {
            username: String,
            password: String,
            firstName: String,
            lastName: String,
            email: String,
            profile: String,
            country: String,
            region: String,
            rating: Number,
            stars: Number,
            loggedIn: Boolean,
            score: {
                overall: Number
            },
            languages: {
                // learning: [{type: mongoose.Schema.Types.ObjectId, ref:'LanguageModel'}],
                // teaching: [{type: mongoose.Schema.Types.ObjectId, ref:'LanguageModel'}]
                learning: [String],
                teaching: [String]
            },
            modules: {
                learning: [{type: mongoose.Schema.Types.ObjectId, ref:'ModuleModel'}],
                teaching: [{type: mongoose.Schema.Types.ObjectId, ref:'ModuleModel'}],
                authored: [{type: mongoose.Schema.Types.ObjectId, ref:'ModuleModel'}]
            },
            dictionaries: [{type: mongoose.Schema.Types.ObjectId, ref:'DictionaryModel'}],
            currentRole: String,
            roles: [String],
            google:   {
                id:    String,
                token: String
            },
            facebook:   {
                id:    String,
                token: String
            }
        }, {collection: "user"});

    var UserModel = mongoose.model('UserModel', UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        findAllUsers: findAllUsers,
        createUser: createUser,
        removeUser: removeUser,
        updateUser: updateUser,
        findUserByGoogleId: findUserByGoogleId,
        findUserByFacebookId: findUserByFacebookId,
        getMongooseModel: getMongooseModel,
        findUsersByCriteria: findUsersByCriteria,
        updateRatingForUser: updateRatingForUser,
        updateLoginStatus: updateLoginStatus
    };
    return api;

    function findUsersByCriteria(criteria) {
        return UserModel.find({
            'languages.teaching': criteria.language,
            'modules.teaching': criteria.moduleId,
            'loggedIn': true
        });
    }

    function findUserByFacebookId(facebookId) {
        return UserModel.findOne({'facebook.id': facebookId});
    }

    function findUserByGoogleId(googleId) {
        return UserModel.findOne({'google.id': googleId});
    }

    function updateLoginStatus(userId, loginStatus) {
        console.log('updateLoginStatus ' + loginStatus + ', ' + userId);
        return UserModel.update({_id: userId}, {$set: {loggedIn: loginStatus}});
    }

    function updateUser(userId, user) {
        delete user.password;
        return UserModel.update({_id: userId}, {$set: user});
    }

    function removeUser(userId) {
        return UserModel.remove({_id: userId});
    }

    function findAllUsers() {
        return UserModel.find();
    }
    function createUser(user) {
        return UserModel.create(user);
    }

    function findUserByUsername(username) {
        return UserModel.findOne({username: username});
    }

    function getMongooseModel() {
        return UserModel;
    }

    function findUserById(userId) {
        return UserModel.findById(userId);
    }

    function findUserByCredentials(credentials) {
        return UserModel.findOne(
            {
                username: credentials.username,
                password: credentials.password
            }
        );
    }

    function updateRatingForUser(stars, userId) {
        return UserModel.update({_id: userId}, {$set:{stars: stars}});
    }
}
