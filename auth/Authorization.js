'use strict'
require('dotenv').config()

var jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.status(200).send({
        status: 'error',
        message: 'No se detecto ningun token de acceso.'
    });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log(err)
            return res.status(200).send({
                status: 'error',
                message: 'El token es invalido.'
            });
        }
        req.user = user;
        next();
    })
}