'use strict'

var Votes = require('../models/Vote');
var Process = require('../models/Process');

var controller = {
    addVote: (req,res) => {
        var params = req.body;

        var vote = new Votes();
        vote.process = params.process;
        vote.votes = params.voteIds;

        vote.save((err,voteStored) => {
            if(err || !voteStored) {
                console.log(err)
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
    },
    countVote: (req, res) => {
        var id = req.params.id;
        Process.findById(id, (err, proc) => {
            if (err || !proc){
                return res.status(200).send({
                    status: 'error',
                    message: 'el proceso no existe'
                });
            }
            var errors = "";
            proc.Positions.forEach(pos => {
                pos.candidates.forEach(can => {
                    Votes.count({ votes: {$elemMatch: {candidate: can._id.toString()}}}, (err,count) => {
                        if(err){
                            can.counter = 0;
                            errors += `Error en el id: ${can._id.toString()}, `;
                        }else {
                            console.log("Para el candidato "+can._id.toString()+" hay "+count+" votos, ")
                        }
                    })
                })
            })
            if(errors !== ""){
                return res.status(200).send({
                    status: 'error',
                    message: errors
                });
            }
            return res.status(200).send({
                status: 'success',
                message: "counters"
            });
        })
    }
};

module.exports = controller;