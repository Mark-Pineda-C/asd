'use strict'

var express = require("express");
var UserController = require('../controllers/UserController');
var Authorization = require('../auth/Authorization');

var router = express.Router();
//rutas para uso de la api
//router.get('/test',UserController.test);
router.post('/validate',UserController.login);
router.post('/validate-admin',UserController.loginAdmin);
router.get('/get-users/:institute',UserController.GetUserTotal);
router.post('/get-credentials',UserController.GetCredentials);
// rutas que requieren autorizacion
//router.post('/create-admin',Authorization,UserController.createAdmin);
router.post('/insert-many',Authorization,UserController.InsertUsers);
//router.delete('/delete-users/:id',Authorization,UserController.DeleteUsers);
router.put('/update-vote/',Authorization,UserController.SubmitVote);
router.post('/logout',Authorization,UserController.logout);

module.exports = router;