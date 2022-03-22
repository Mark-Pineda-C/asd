'use strict'
require('dotenv').config()

var cors = require('cors')
//Cargar modulos de node para cargar el servidor
var express = require('express');
var bodyParser = require('body-parser');

//Cargar express (http)
var app = express();

//Cargar ficheros rutas
var user_routes = require('./routes/UserRouter');
var process_routes = require('./routes/ProcessRouter');
var vote_routes = require('./routes/VoteRouter');
var other_routes = require('./routes/OtherRoutes');

//Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({limit: '1mb'}));

//CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use('/api/users',user_routes);
app.use('/api/process',process_routes);
app.use('/api/votes',vote_routes);
app.use('/api/others',other_routes);

//Exportar modulo (fichero actual)
module.exports = app;