'use-strict'
require('dotenv').config();

const nodemailer = require("nodemailer");
var jwt = require('jsonwebtoken');
var validator = require('validator');
var User = require('../models/Users');
var Process = require('../models/Process');
const Users = require('../models/Users');
const DateTime = require('luxon').DateTime;
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
        try{
            var validate_id = !validator.isEmpty(params.id);
            var validate_pin = !validator.isEmpty(params.pin);
        }catch(err){
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos',
                type: 0
            })
        }

        if(validate_pin && validate_id){
            User.findOne({id: params.id, pin: params.pin, institution: params.institute}, (err, user) => {
                if(err || !user){
                    return res.status(200).send({
                        status: 'error',
                        message: 'El usuario no existe',
                        type: 0
                    })
                }
                if (user.hasVoted === true || user.isActive === true){
                    return res.status(200).send({
                        status: 'error',
                        message: 'Solo se puede ingresar a la votacion una vez',
                        type: 0
                    });
                }
                Process.findOne({InstituteName: params.institute}, '_id ProcessDateStart ProcessDateEnd', (procErr, Process) => {
                    if (procErr) {
                        return res.status(200).send({
                            status: 'error',
                            message: 'El proceso no existe',
                            type: 0
                        })
                    }
                    var start = DateTime.fromISO(Process.ProcessDateStart.toISOString(),{ zone: 'America/Lima'});
                    var end = DateTime.fromISO(Process.ProcessDateEnd.toISOString(),{ zone: 'America/Lima'});
                    if( DateTime.now().ts < start.ts) {
                        return res.status(200).send({
                            status: 'error',
                            message: 'El proceso aun no esta activo',
                            type: 1
                        });
                    }
                    if( DateTime.now().ts > end.ts) {
                        return res.status(200).send({
                            status: 'error',
                            message: 'El proceso ya finalizo',
                            type: 1
                        });
                    }
                    User.findByIdAndUpdate(user._id.toString(),{isActive: true}, (err) => {
                        if (err){
                            return res.status(200).send({
                                status: 'error',
                                message: 'error inesperado del servidor'
                            })
                        }
                        const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET, {expiresIn:300000})
                        return res.status(200).send({
                            status: 'success',
                            role: user.role,
                            token: accessToken,
                            message: Process._id,
                            user: user._id
                        })
                    })
                    
                });
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
                    console.log(user);
                    return res.status(200).send({
                        status: 'error',
                        message: 'El usuario no existe'
                    })
                }
                const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET, {expiresIn: 86400000})
                return res.status(200).send({
                    status: 'success',
                    role: user.role,
                    token: accessToken,
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
    logout: (req, res) => {
        var id = req.body.id;
        User.findByIdAndUpdate(id,{isActive: false},() => {
            return res.status(200).send({
                status: 'success'
            })
        })
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
            obj["code"] = user.code || user.Id || user.Code || user.id || user.codes || user.Codes || '';
            obj["mail"] = user.Email || user.email || user.mail || user.Mail || '';
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
    GetUserTotal: (req,res) => {
        var institute = req.params.institute;
        if (institute === ''){
            return res.status(200).send({
                status: 'error',
                message: 'Indique el nombre de la institucion'
            });
        }
        User.countDocuments({ institution: institute }, (err,countedUsers) => {
            if(err){
                return res.status(200).send({
                    status: 'error',
                    message: 'Ocurrio un error inesperado'
                });
            }
            if(countedUsers === 0){
                return res.status(200).send({
                    status: 'error',
                    message: 'No existen usuarios'
                });
            }
            Users.countDocuments({institution: institute, hasVoted: true}, (err,countedVoters) => {
                if(err){
                    return res.status(200).send({
                        status: 'error',
                        message: 'Ocurrio un error inesperado'
                    });
                }
                return res.status(200).send({
                    status: 'success',
                    message: [countedUsers,countedVoters]
                });
            })
        })
    },
    SubmitVote: (req,res) => {
        var id = req.body.id;
        User.findByIdAndUpdate(id,{ $set: {hasVoted: true, isActive: false}}, (err) =>{
            if(err){
                return res.status(200).send({
                    status: 'error',
                    message: "Ocurrio un error inesperado."
                })
            }
            return res.status(200).send({
                status: 'success',
                message: "Se emitio el voto correctamente"
            })
        })
    },
    GetCredentials: (req,res) => {
        var params = req.body;

        try{
            var val_code = !validator.isEmpty(params.code);
            var val_mail = !validator.isEmpty(params.mail);
            var val_institute = !validator.isEmpty(params.institute);
        }catch(err){
            res.status(200).send({
                status: 'error',
                message: 'Porfavor rellene los campos.'
            });
        }
        if(val_code && val_mail && val_institute){

            User.findOne({code: params.code, institution: params.institute}, 'id pin', (err,user) => {
                if(err || !user){
                    return res.status(200).send({
                        status: 'error',
                        message: 'El usuario no existe!'
                    });
                }
                const mailText = "\nSu id de acceso es: "+user.id+"\nSu pin de acceso es: "+user.pin;
                const mailHtml = `<div><p>Su id de acceso es ${user.id}</p><p>Su pin de acceso es: ${user.pin}</p><br><p>Puede ingresar al sistema en la pagina [insertar url de pagina]</p></div>`

                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.GMAIL_ACCESS_ACCOUNT,
                        pass: process.env.GMAIL_ACCESS_PASSWORD
                    }
                });
                try{
                    transporter.sendMail({
                        from: '"Instavote@mail" <instavote@webmaster.com>',
                        to: params.mail,
                        subject: "Entrega de credenciales",
                        text: mailText,
                        html: mailHtml
                    })
                }catch(err){
                    console.log(err)
                    return res.status(200).send({
                        status: 'error',
                        message: 'Error al enviar el correo!'
                    })
                }
                return res.status(200).send({
                    status: 'success',
                    message: 'Credenciales enviadas correctamente.'
                })
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