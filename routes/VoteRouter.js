'use strict'

var express = require("express");
var VoteController = require('../controllers/VoteController');
var Authorization = require('../auth/Authorization');

var router = express.Router();

router.post('/create-vote',Authorization,VoteController.addVote);
router.get('/vote-count/:id',VoteController.countVote);

module.exports = router;