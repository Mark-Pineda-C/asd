'use strict'
const mongoose = require('mongoose');
const USER = "CristhianR";
const PASSWORD = '12cristhian34';

const URI = 'mongodb+srv://'+USER+':'+PASSWORD+'@instavotedb.rwssj.mongodb.net/Instavote-backend?retryWrites=true&w=majority';

const connectDB = async() => {
    await mongoose.connect(URI,{
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    console.log('database connected!');
}

module.exports = connectDB;