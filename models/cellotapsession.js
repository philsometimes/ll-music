var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tapSchema = new Schema({
    userName : String,
    userPassword: String,
    userEmail: String,
    userBackground: String, //array of strings
    userBlurb: String,
    userComment: String,
    userEvents: Schema.Types.Mixed
}, {strict: true}); //values not specified in schema are not saved

module.exports = mongoose.model('sessionInfo', tapSchema );
