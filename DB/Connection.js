'use strict'
const mongoose = require('mongoose');
const USER = "MarkP";
const PASSWORD = 'y1xATOtrmcQAp9Km';

const URI = 'mongodb+srv://'+USER+':'+PASSWORD+'@instavotedb.rwssj.mongodb.net/Instavote-backend?retryWrites=true&w=majority';

const connectDB = async() => {
    await mongoose.connect(URI,{
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    console.log('databse connected!');
}

module.exports = connectDB;