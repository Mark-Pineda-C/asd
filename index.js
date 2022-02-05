'use strict'

const connectDB = require('./DB/Connection');
var app = require('./app');
var port = 3900;

connectDB();
app.listen(port, () => {
    console.log('Servidor iniciado en localhost:'+port)
})