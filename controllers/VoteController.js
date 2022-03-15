'use strict'

var validator = require('validator');
var Vote = require('../models/Vote');

var controller = {
    addVote: (req,res) => {
        var params = req.body;

        var vote = new Vote();
        vote.voteDate = params.voteDate
        vote.votes = params.voteIds

        vote.save((err,voteStored) => {
            if(err || !voteStored) {
                return res.status(200).send({
                    status: 'error',
                    message: 'Ocurrio un error'
                });
            }
            return res.status(200).send({
                status: 'success',
                voteStored
            })
        });
    }
};

module.exports = controller;