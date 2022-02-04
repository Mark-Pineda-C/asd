'use strict'

var express = require("express");

var UserController = require('../controllers/UserController');

var router = express.Router();

router.get('/test',UserController.test);
router.post('/create-admin',UserController.createAdmin);


module.exports = router;