var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var mongoose         = require("mongoose");

module.exports = function(app) {

    var userModel = require("../../models/user/user.model.server.js")();

    var auth = authorized;

    app.post  ('/api/login', passport.authenticate('local'), login);
    app.post  ('/api/logout',         logout);
    app.post  ('/api/register',       register);
    app.post  ('/api/user',     auth, createUser);
    app.get   ('/api/user/:id',       findUserById);
    app.post  ('/api/user/search',    findUsersByCriteria);
    app.get   ('/api/loggedin',       loggedin);
    app.get   ('/api/user',     auth, findAllUsers);
    app.put   ('/api/user/:id', auth, updateUser);
    app.delete('/api/user/:id', auth, deleteUser);
    app.put   ('/api/user/:id/rating', updateRatingForUser);

    function findUserById(req, res) {
        var userId = req.params.id;
        userModel
            .findUserById(userId)
            .then(function (user) {
                res.json(user);
            });
    }

    function findUsersByCriteria(req, res) {
        var criteria = req.body;
        userModel
            .findUsersByCriteria(criteria)
            .then(function (users) {
                res.json(users);
            });
    }

//     app.get   ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
//     app.get   ('/auth/facebook/callback',
//         passport.authenticate('facebook', {
//             successRedirect: '/#/profile',
//             failureRedirect: '/#/login'
//         }));
//
//     app.get   ('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
//     app.get   ('/google/oauth2callback',
//         passport.authenticate('google', {
//             successRedirect: '/#/session',
//             failureRedirect: '/#/login'
//         }));
//
//     var googleConfig = {
//         // clientID        : process.env.GOOGLE_CLIENT_ID,
//         // clientSecret    : process.env.GOOGLE_CLIENT_SECRET,
//         // callbackURL     : process.env.GOOGLE_CALLBACK_URL
//         clientID        : process.env.SPEAKAPP_GOOGLE_OAUTH2_CLIENT_ID,
//         clientSecret    : process.env.SPEAKAPP_GOOGLE_OAUTH2_CLIENT_SECRET,
//         callbackURL     : process.env.SPEAKAPP_GOOGLE_OAUTH2_CALLBACK_URL
//     };
//
//     var facebookConfig = {
//         clientID        : process.env.FACEBOOK_CLIENT_ID,
//         clientSecret    : process.env.FACEBOOK_CLIENT_SECRET,
//         callbackURL     : process.env.FACEBOOK_CALLBACK_URL
//     };
//
//     passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
//     passport.use(new GoogleStrategy(googleConfig, googleStrategy));
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
//
//     function facebookStrategy(token, refreshToken, profile, done) {
//         userModel
//             .findUserByFacebookId(profile.id)
//             .then(
//                 function(user) {
//                     if(user) {
//                         return done(null, user);
//                     } else {
//                         var names = profile.displayName.split(" ");
//                         var newFacebookUser = {
//                             lastName:  names[1],
//                             firstName: names[0],
//                             email:     profile.emails ? profile.emails[0].value:"",
//                             facebook: {
//                                 id:    profile.id,
//                                 token: token
//                             }
//                         };
//                         newFacebookUser.username = newFacebookUser.email;
//                         return userModel.createUser(newFacebookUser);
//                     }
//                 },
//                 function(err) {
//                     if (err) { return done(err); }
//                 }
//             )
//             .then(
//                 function(user){
//                     return done(null, user);
//                 },
//                 function(err){
//                     if (err) { return done(err); }
//                 }
//             );
//     }
//
//     function googleStrategy(token, refreshToken, profile, done) {
//         userModel
//             .findUserByGoogleId(profile.id)
//             .then(
//                 function(user) {
//                     if(user) {
//                         return done(null, user);
//                     } else {
//                         var newGoogleUser = {
//                             lastName:  profile.name.familyName,
//                             firstName: profile.name.givenName,
//                             email:     profile.emails[0].value,
//                             username:  profile.emails[0].value,
//                             google: {
//                                 id:    profile.id,
//                                 token: token
//                             }
//                         };
//                         return userModel.createUser(newGoogleUser);
//                     }
//                 },
//                 function(err) {
//                     if (err) { return done(err); }
//                 }
//             )
//             .then(
//                 function(user){
//                     return done(null, user);
//                 },
//                 function(err){
//                     if (err) { return done(err); }
//                 }
//             );
//     }
//
    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials({username: username, password: password})
            .then(
                function(user) {
                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
//        user.password = '';
        done(null, user);
    }

    function deserializeUser(user, done) {
  //      user.password = '';
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        if(req.user) {
            userModel
                .updateLoginStatus(req.user._id, true)
                .then(function () {
                    user.password = '';
                    res.json(user);
                });
        } else {
            res.send(200);
        }
    }

    function loggedin(req, res) {
        if(req.user)
            req.user.password = '';
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        if(req.user) {
            userModel
                .updateLoginStatus(req.user._id, false)
                .then(function () {
                    req.logOut();
                    user.password = '';
                });
        } else {
            req.logOut();
        }
        res.send(200);
    }

    function register(req, res) {
        var newUser = req.body;
        newUser.roles = ['student'];

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        return userModel.createUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            user.password = '';
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function findAllUsers(req, res) {
        if(isAdmin(req.user)) {
            userModel
                .findAllUsers()
                .then(
                    function (users) {
                        res.json(users);
                    },
                    function () {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }

    function deleteUser(req, res) {
        if(isAdmin(req.user)) {

            userModel
                .removeUser(req.params.id)
                .then(
                    function(user){
                        return userModel.findAllUsers();
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                )
                .then(
                    function(users){
                        res.json(users);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }

    function updateUser(req, res) {
        var newUser = req.body;
        if(!isAdmin(req.user)) {
            delete newUser.roles;
        }
        if(typeof newUser.roles == "string") {
            newUser.roles = newUser.roles.split(",");
        }

        userModel
            .updateUser(req.params.id, newUser)
            .then(
                function(status){
                    // return userModel.findAllUsers();
                    res.json(200);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            // .then(
            //     function(users){
            //         res.json(users);
            //     },
            //     function(err){
            //         res.status(400).send(err);
            //     }
            // );
    }

    function createUser(req, res) {
        var newUser = req.body;
        if(newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["student"];
        }

        // first check if a user already exists with the username
        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    // if the user does not already exist
                    if(user == null) {
                        // create a new user
                        return userModel
                            .createUser(newUser)
                            .then(
                                // fetch all the users
                                function(){
                                    return userModel.findAllUsers();
                                },
                                function(err){
                                    res.status(400).send(err);
                                }
                            );
                    // if the user already exists, then just fetch all the users
                    } else {
                        return userModel.findAllUsers();
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(){
                    res.status(400).send(err);
                }
            )
    }

    function isAdmin(user) {
        return true;
        // if(user.roles.indexOf("admin") > 0) {
        //     return true
        // }
        // return false;
    }

    function authorized (req, res, next) {
        next();
        // if (!req.isAuthenticated()) {
        //     res.send(401);
        // } else {
        //     next();
        // }
    }

    function updateRatingForUser(req, res) {
        var userId = req.params.id;
        var stars = req.body.stars;
        userModel
            .updateRatingForUser(stars, userId)
            .then(
                function(status){
                    res.json(200);
                },
                function(err){
                    res.status(400).send(err);
                });
    }
}