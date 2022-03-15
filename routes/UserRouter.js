'use strict'

var express = require("express");

var UserController = require('../controllers/UserController');

var router = express.Router();
//rutas para uso de la api
router.get('/test',UserController.test);
router.post('/create-admin',UserController.createAdmin);
router.post('/validate',UserController.login);
router.post('/validate-admin',UserController.loginAdmin);
router.post('/insert-many',UserController.InsertUsers);
router.delete('/delete-users/:institute',UserController.DeleteUsers);
router.get('/get-users/:institute',UserController.GetUsers);

module.exports = router;