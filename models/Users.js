'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    code: String,
    mail: String,
    pin: {
        type: String,
        default: ''
    },
    id: {
        type: String,
        default: ''
    },
    accessToken: {
        type: String,
        default: ''
    },
    hasVoted: {
        type: Boolean, 
        default:false
    },
    role: {
        type: String, 
        enum:['USER','ADMIN'], 
        default:'USER'
    },
    userToken: String,
    institution: String
});

module.exports = mongoose.model('User', UserSchema);
