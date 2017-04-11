/**
 * Created by niharikasharma on 4/10/17.
 */

var mongoose = require('mongoose');
var languageSchema = mongoose.Schema({
    name: String,
    region: String,
    dialect: String,
    country: String
}, {collection : 'language'});

module.exports = languageSchema;
