/**
 * Created by xulingming on 2017/3/25.
 */

import LOG4JS from 'log4js';

LOG4JS.configure(require('./log4js.json'), {
  cwd: require('../environment').logDir
});

const LOGGER = LOG4JS;
module.exports = LOGGER;
