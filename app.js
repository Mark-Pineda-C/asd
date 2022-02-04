'use strict'

//Cargar modulos de node para cargar el servidor
var express = require('express');
var bodyParser = require('body-parser');

//Cargar express (http)
var app = express();

//Cargar ficheros rutas
var user_routes = require('./routes/UserRouter');

//Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
 
//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use('/users',user_routes);

//Exportar modulo (fichero actual)
module.exports = app;