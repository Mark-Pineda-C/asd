'use strict'

var express = require("express");

var OtherController = require("../controllers/Others")

var router = express.Router();

router.post('/upload',OtherController.convertImage);

module.exports = router;