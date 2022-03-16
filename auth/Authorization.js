'use strict'
require('dotenv').config()

var jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const authHeader = req.headers['Authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.status(200).send({
        status: 'error',
        message: 'No se detecto ningun token de acceso.'
    });

    jwt.verify(token, process.env.JWT_SECRET_PASSPHRASE, (err, user) => {
        if (err) return res.status(200).send({
            status: 'error',
            message: 'El token es invalido.'
        });
        req.user = user;
        next();
    })
}