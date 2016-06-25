'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip:     process.env.OPENSHIFT_NODEJS_IP ||
          process.env.IP ||
          undefined,

  // Server port
  port:   process.env.OPENSHIFT_NODEJS_PORT ||
          process.env.PORT ||
          8080,

  // MongoDB connection options
  mongo: {
    uri:  process.env.MONGODB_URI ||
          process.env.MONGOHQ_URL ||
          process.env.OPENSHIFT_MONGODB_DB_URL +
          process.env.OPENSHIFT_APP_NAME ||
          'mongodb://localhost/snoopy'
  },

  // Sequelize connection opions
  sequelize: {
    database: 'snoopy',
    username: 'root',
    password: 'xlm1',	
    //uri: 'mysql://localhost:3306/snoopy-dev',
    options: {
      dialect: 'mysql',
      host: process.env.HOST || 'localhost',
      port: process.env.MYSQL_PORT || 3306,
      dialectModulePath: null,
      logging: false,

      // only for sqlite	
      //storage: 'dev.sqlite',
      define: {
        timestamps: false
      }
    }
  },
};
