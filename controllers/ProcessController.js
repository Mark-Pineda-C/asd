'use-strict'

var validator = require('validator');
var Process = require('../models/Process');

var controller = {
    test: (req,res) => {
        return res.status(200).send({
            status: 'success',
            message: 'testeo de api'
        });
    },
    createProcess: (req,res) => {
        var params = req.body;

        var process = new Process();
        process.ProcessName = params.ProcessName
        process.InstituteName = params.InstituteName
        process.ProcessBanner = params.ProcessBanner
        process.ProcessDate = params.ProcessDate
        process.Positions = params.Positions

        process.save((err,processStored) => {
            if(err || !processStored){
                return res.status(200).send({
                    status: 'error',
                    message: 'Error al momento de guardar'
                });
            }
            return res.status(200).send({
                status: 'success',
                processStored
            });
        })

    },
    getProcessInfo: (req,res) => {
        Process.find({},'ProcessDate ProcessName InstituteName ProcessBanner', (err, processList) => {
            if(err){
                console.log(err);
                return res.status(200).send({
                    status: 'error',
                    message: 'ocurrio un error',
                    err
                });
            }
            if(!processList){
                return res.status(200).send({
                    status: 'error',
                    message: 'No hay Procesos...'
                });
            }
            return res.status(200).send({
                status: 'success',
                message: processList
            });
        })
    },
    getProcessPositions: (req,res) => {
        var processId = req.params.id;
        Process.findById(processId, (err,process) => {
            if(err || !process){
                return res.status(200).send({
                    status: 'error',
                    message: 'El proceso no existe'
                })
            }
            return res.status(200).send({
                status: 'success',
                message: process.Positions
            })
        })
    }
};

module.exports = controller;