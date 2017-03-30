'use strict';

var express = require('express');
var controller = require('./static.controller');

var router = express.Router();

router.get('/', controller.login);

module.exports = router;
