'use-strict'

var validator = require('validator');
var User = require('../models/Users');

var controller = {
    test: (req,res) => {
        return res.status(200).send({
            status: 'success',
            message: 'testeo de api'
        });
    },
    createAdmin: (req,res) => {
        var params = req.body;

        try{
            var validate_id = !validator.isEmpty(params.id);
            var validate_pin = !validator.isEmpty(params.pin);

        }catch(err){
            console.log(err);
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos'
            })
        }

        if(validate_pin && validate_id){
            var user = new User();

            user.id = params.id;
            user.pin = params.pin;
            user.role = "ADMIN";

            user.save((err,userStored) => {
                if(err || !userStored){
                    return res.status(404).send({
                        status: 'error',
                        message: 'El usuario no se guardo'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    message: userStored
                });
            })
        }else{
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son validos'
            })
        }
    }
}

module.exports = controller;