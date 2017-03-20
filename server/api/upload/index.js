'use strict';

var express = require('express');
var controller = require('./upload.controller');

var router = express.Router();
var multer  = require('multer');
var upload = multer({ dest: 'images/' });

router.post('/', upload.any(),controller.upload);

module.exports = router;
