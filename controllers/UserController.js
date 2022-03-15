'use-strict'

var validator = require('validator');
var User = require('../models/Users');
var Process = require('../models/Process');
var randexp = require('randexp').randexp;

function generateId(quantity) {
    var array = []
    while(array.length < quantity){
        array.push(randexp(/[A-Z]{2}\d{6}/));
    }
    return array
}
function generatePin(quantity) {
    var array = []
    while(array.length < quantity){
        array.push(randexp(/[A-Z]\d{8}/));
    }
    return array
}

var controller = {
    test: (req,res) => {
        return res.status(200).send({
            status: 'success'
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
    },
    login: (req,res) => {
        var params = req.body;
        console.log(params);
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
            User.findOne({id: params.id, pin: params.pin, institution: params.institute}, (err, user) => {
                if(err || !user){
                    return res.status(200).send({
                        status: 'error',
                        message: 'El usuario no existe'
                    })
                }
                if(user){
                    Process.findOne({InstituteName: params.institute}, '_id', (procErr, process) => {
                        if (procErr) {
                            return res.status(200).send({
                                status: 'error',
                                message: 'El proceso no existe'
                            })
                        }
                        return res.status(200).send({
                            status: 'success',
                            role: user.role,
                            message: process._id,
                        })
                    });
                }
            });
        }else{
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son validos'
            })
        }

    },
    loginAdmin: (req,res) => {
        var params = req.body;
        console.log(params);
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
            User.findOne({id: params.id, pin: params.pin, role: "ADMIN"}, (err, user) => {
                if(err || !user){
                    console.log('fail')
                    return res.status(200).send({
                        status: 'error',
                        message: 'El usuario no existe'
                    })
                }
                console.log(user)
                return res.status(200).send({
                    status: 'success',
                    role: user.role,
                    message: user
                })
            })
        }else{
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son validos'
            })
        }
    },
    InsertUsers: (req,res) => {
        var userarray = req.body["users"];
        var insitute = req.body["institute"];
        var params = [];
        var ids = generateId(userarray.length);
        var pins = generatePin(userarray.length);
        var cont = 0;
        for (const user of userarray) {
            var obj = {}; // nombre, codigo/email
            obj["code"] = user.code || user.Id || user.Code || user.id || '';
            obj["mail"] = user.Email || user.email || '';
            obj["id"] = ids[cont];
            obj["pin"] = pins[cont];
            obj["institution"] = insitute;
            params.push(obj);
            cont++;
        }

        User.insertMany(params, (err,insertedUsers) => {
            if(err || !insertedUsers){
                return res.status(200).send({
                    status: 'error',
                    message: 'Ocurrio un error.'
                });
            }
            return res.status(200).send({
                status: 'success',
                message: 'Los Usuarios fueron añadidos'
            });
        })
    },
    DeleteUsers: (req,res) => {
        var institute = req.params.institute;
        if (institute === ''){
            return res.status(200).send({
                status: 'error',
                message: 'Indique el nombre de la institucion'
            });
        }
        User.deleteMany({institution: institute}, (err, deletedUsers) => {
            var deleteCount = Object.values(deletedUsers);
            if(err){
                return res.status(200).send({
                    status: 'error',
                    message: 'Ocurrio un error'
                });
            }
            if(deleteCount == 0){
                return res.status(200).send({
                    status: 'error',
                    message: 'Se eliminarion 0 usuarios'
                });
            }
            return res.status(200).send({
                status: 'success',
                message: 'se eliminarion '+deleteCount+' usuarios'
            });
        })
    },
    GetUsers: (req,res) => {
        var institute = req.params.institute;
        if (institute === ''){
            return res.status(200).send({
                status: 'error',
                message: 'Indique el nombre de la institucion'
            });
        }
        User.find({ institution: institute }, (err,listedUsers) => {
            if(err){
                return res.status(200).send({
                    status: 'error',
                    message: 'Ocurrio un error inesperado'
                });
            }
            if(listedUsers.length == 0){
                return res.status(200).send({
                    status: 'error',
                    message: 'No existen usuarios'
                });
            }
            return res.status(200).send({
                status: 'success',
                listedUsers
            });
        })
    }
}

module.exports = controller;