'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProcessSchema = Schema({
    ProcessName: String,
    InstituteName: String,
    ProcessBanner: String,
    Positions: [{
        position: String,
        candidates: [{
            name: String,
            group: String,
            image: String
        }]
    }],
    ProcessDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Process', ProcessSchema);
