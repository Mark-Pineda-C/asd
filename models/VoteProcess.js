'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VoteProcessSchema = Schema({
    validationToken: String,
    processDate: { type: Date, default: Date.now },
    voteFor: String
});

module.exports = mongoose.model('VoteProcess', VoteProcessSchema);