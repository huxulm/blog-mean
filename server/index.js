'use strict';

// Set default node environment to development
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Babel can turn ES6 code into readable vanilla ES5 with source maps
// otherwise 'import' reserved word can't be used
if (env === 'development' || env === 'test' || env === 'production') {
  // Register the Babel require hook
  require('babel-register');
}

// Export the application
exports = module.exports = require('./app');
