'use strict';

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://127.0.0.1/snoopy-dev'
  },

  // Sequelize connection opions
  sequelize: {
    database: 'snoopy_dev',
    username: 'root',
    password: 'xlm1',
    //uri: 'mysql://localhost:3306/snoopy-dev',
    options: {
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      dialectModulePath: null,
      logging: false,

      // only for sqlite
      //storage: 'dev.sqlite',
      define: {
        timestamps: false
      }
    }
  },

  mutler: {
    dest: '/Users/xulingming/data/blog_uploads'
  },

  // Seed database on startup
  seedDB: false

};
