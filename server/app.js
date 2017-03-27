/**
 * Main application file
 */

'use strict';

import express from 'express';
import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');
import sqldb from './sqldb';
import config from './config/environment';
import http from 'http';
import LOGGER from './config/log';

// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection
.on('connecting', function(){
    console.log("trying to establish a connection to mongo");
})
.on('connected', function() {
    console.log("mongodb connection established successfully");
})
.on('error', function(err) {
    console.log('connection to mongo failed ' + err);
})
.on('disconnected', function() {
    console.log('mongo db connection closed');
});

// Populate databases with sample data
if (config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = http.createServer(app);

// static
app.use(require('./monitor/statics')._static);

// log
var logger = LOGGER.getLogger('blog-info');
logger.setLevel('INFO');
app.use(LOGGER.connectLogger(logger, { level: LOGGER.levels.INFO}));
require('./config/express').default(app);
require('./routes').default(app);

// Start server
function startServer() {
  app.angularFullstack = server.listen(config.port, config.ip, function() {
    logger.info('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

sqldb.sequelize.sync()
  .then(startServer)
  .catch(function(err) {
    logger.info('Server failed to start due to error: %s', err);
  });

// Expose app
exports = module.exports = app;
