'use strict';

var express = require('express');
import * as auth from '../../auth/auth.service';
var controller = require('./upload.controller');
var env = require('../../config/environment');
var router = express.Router();
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, env.mutler.dest);
  },
  filename: function (req, file, cb) {
    let sufix = file.mimetype.toString().substring(file.mimetype.indexOf('/') + 1);
    let storeName = file.fieldname + '-' + Date.now() + '.' + sufix;
    console.log('file store name: ' + storeName);
    cb(null, storeName);
  }
});

var upload = multer({ storage: storage })

router.post('/', auth.isAuthenticated(), upload.any(),controller.upload);

module.exports = router;
