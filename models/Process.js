'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProcessSchema = Schema({
    name: String,
    institution: String,
    logo: String,
    candidates: {
        name: String,
        image: String,
        position: String,
        group: String,
        voteCont: Number
    },
    voteDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Process', ProcessSchema);
