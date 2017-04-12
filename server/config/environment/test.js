'use strict';

// Test specific configuration
// ===========================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/snoopy-test'
  },
  sequelize: {
    uri: 'sqlite://',
    options: {
      logging: false,
      storage: 'test.sqlite',
      define: {
        timestamps: false
      }
    }
  },

  mutler: {
    dest: '/Users/xulingming/data/blog_uploads/imgs',
    dir: '/Users/xulingming/data/blog_uploads'
  },

  logDir: '/Users/xulingming/Public/logs/blog'
};
