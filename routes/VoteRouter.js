'use strict'

var express = require("express");

var VoteController = require('../controllers/VoteController');

var router = express.Router();

router.post('/create-vote',VoteController.addVote);

module.exports = router;