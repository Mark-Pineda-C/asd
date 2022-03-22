'use strict'
require('dotenv').config();

const Process = require('../models/Process');
const Vote = require('../models/Vote');
const DateTime = require("luxon").DateTime;
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASSWORD+'@instavotedb.rwssj.mongodb.net/Instavote-backend?retryWrites=true&w=majority');


const now = DateTime.now();
console.log('Iniciando revision de procesos terminados a las ' + now.toFormat('HH:mm'));

Process.find({}, 'ProcessDateEnd', (err,doc) => {
    if(err){
        console.log("error");
        process.exit(1);
    }
    if(!doc) {
        console.log("No hay Procesos");
        process.exit(0);
    } else {
        doc.forEach(d => {
            var l_date = DateTime.fromISO(d.ProcessDateEnd.toISOString());
            if (l_date.ts < now.ts){
                console.log("Se encontro un proceso Finalizado")
                Process.findById(d._id, (err,Proc) => {
                    if (err){
                        console.log("Ocurrio un error");
                        console.log(err);
                    }
                    if(Proc.hasEnded === false){
                        Proc.Positions.forEach((pos) => {
                            pos.candidates.forEach((can) => {
                                Vote.count({ votes: {$elemMatch: {candidate: can._id.toString()}}}, (err,count) => {
                                    if(err){
                                        can.counter = 0;
                                        console.log('error');
                                    }else {
                                        Process.findOneAndUpdate(
                                            {Positions:
                                                {$elemMatch:
                                                    {candidates:
                                                        {$elemMatch:
                                                            {_id: can._id.toString()}
                                                        }
                                                    }
                                                }
                                            }, {$set: {"Positions.$[p].candidates.$[c].counter": count},
                                                $set: {"hasEnded": true}
                                            }, {arrayFilters: [
                                                {"p._id": pos._id.toString()},
                                                {"c._id": can._id.toString()}]
                                            }, (err,updatedProc) => {
                                                if(err){
                                                    console.log('error al asignar el voto para el candidato de id '+can._id.toString());
                                                    console.log(err);
                                                } else {
                                                    console.log('contador actualizado para '+can._id.toString()+' con el contador igual a '+count);
                                                }
                                            })
                                    }
                                })
                            });
                        });
                        console.log('Votos contabilizados correctamente');
                    } else {
                        console.log('Listo');
                    }
                    
                })
            } else {
                console.log("No hay procesos finalizados");
            }
        })
    }
})
