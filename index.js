'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3900;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/instavote-backend',{useNewUrlParser : true})
    .then(()=>{
        console.log('la conexion se realizo correctamente');

        //Crear servidor y pornerme a escuchar peticiones http
        app.listen(port,() => {
            console.log('Servidor corriendo en http://localhost:'+port);
        })

    })