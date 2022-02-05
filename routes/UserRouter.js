'use strict'

var express = require("express");

var UserController = require('../controllers/UserController');

var router = express.Router();
//rutas para uso de la api
router.get('/test',UserController.test);
router.post('/create-admin',UserController.createAdmin);
router.post('/validate',UserController.login);

module.exports = router;