'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    code: String,
    mail: String,
    pin: String,
    id: String,
    accessToken: String,
    hasVoted: {type: Boolean, default:false},
    institute: String,
    role: { type: String, enum:["USER","ADMIN"], default:"USER"}
});

module.exports = mongoose.model('User', UserSchema);