'use strict'

const connectDB = require('./DB/Connection');
const bree = require('./bree')
var app = require('./app');
var port = 3900;

connectDB;
app.listen(port, () => {
    console.log('Servidor iniciado en localhost:'+port)
    bree.start();
})