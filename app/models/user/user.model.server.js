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
            score: {
                overall: Number
            },
            languages: {
                learning: [String],
                teaching: [String]
            },
            modules: {
                learning: [{type: mongoose.Schema.Types.ObjectId, ref:'ModuleModel'}],
                teaching: [{type: mongoose.Schema.Types.ObjectId, ref:'ModuleModel'}],
                authored: [{type: mongoose.Schema.Types.ObjectId, ref:'ModuleModel'}]
            },
            dictionaries: [{type: mongoose.Schema.Types.ObjectId, ref:'DictionaryModel'}],
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
        findUsersByCriteria: findUsersByCriteria
    };
    return api;

    function findUsersByCriteria(criteria) {
        console.log('findUsersByCriteria');
        console.log(criteria);
        return UserModel.find({
            'languages.teaching': criteria.language,
            'modules.teaching': criteria.moduleId
        });
    }

    function findUserByFacebookId(facebookId) {
        return UserModel.findOne({'facebook.id': facebookId});
    }

    function findUserByGoogleId(googleId) {
        return UserModel.findOne({'google.id': googleId});
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
        console.log(credentials);
        return UserModel.findOne(
            {
                username: credentials.username,
                password: credentials.password
            }
        );
    }
};