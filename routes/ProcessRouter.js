'use strict'

var express = require("express");
var ProcessController = require('../controllers/ProcessController');
var Authorization = require('../auth/Authorization');

var router = express.Router();

//router.get('/test',ProcessController.test);
router.get('/get-process-list',ProcessController.getProcessInfo);
//rutas que requieren autorizacion
router.post('/create-process',Authorization,ProcessController.createProcess);
router.get('/get-process-positions/:id',Authorization,ProcessController.getProcessPositions);

module.exports = router;