/**
ns.host='localhost']	String	The host of the relational database.
[options.port=]	Integer	The port of the relational database.
[options.protocol='tcp']	String	The protocol of the relational database.


[options.define={}
 * Sequelize initialization module
 */

'use strict';

import path from 'path';
import config from '../config/environment';
import Sequelize from 'sequelize';

var db = {
  Sequelize,
  sequelize: new Sequelize(config.sequelize.database, config.sequelize.username, config.sequelize.password, config.sequelize.options)
};

// Insert models below

module.exports = db;
