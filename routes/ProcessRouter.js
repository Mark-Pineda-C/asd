'use strict'

var express = require("express");

var ProcessController = require('../controllers/ProcessController');

var router = express.Router();

router.get('/test',ProcessController.test);
router.post('/create-process',ProcessController.createProcess);
router.get('/get-process-list',ProcessController.getProcessInfo);
router.get('/get-process-positions/:id',ProcessController.getProcessPositions);

module.exports = router;