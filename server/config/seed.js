/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import Category from '../api/category/category.model';
import Blog from '../api/blog/blog.model';
import sqldb from '../sqldb';

Thing.find({}).remove()
  .then(() => {
    Thing.create({
      name: 'Development Tools',
      info: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' +
             'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' +
             'Stylus, Sass, and Less.'
    }, {
      name: 'Server and Client integration',
      info: 'Built with a powerful and fun stack: MongoDB, Express, ' +
             'AngularJS, and Node.'
    }, {
      name: 'Smart Build System',
      info: 'Build system ignores `spec` files, allowing you to keep ' +
             'tests alongside code. Automatic injection of scripts and ' +
             'styles into your index.html'
    }, {
      name: 'Modular Structure',
      info: 'Best practice client and server structures allow for more ' +
             'code reusability and maximum scalability'
    }, {
      name: 'Optimized Build',
      info: 'Build process packs up your templates as a single JavaScript ' +
             'payload, minifies your scripts/css/images, and rewrites asset ' +
             'names for caching.'
    }, {
      name: 'Deployment Ready',
      info: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
             'and openshift subgenerators'
    });

    console.log("OK completed!");
  });


User.find({}).remove()
  .then(() => {
    User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });


sqldb.sequelize
  .authenticate()
  .then(function(err) {
    console.log('Mysql connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });


Blog.find({}).remove()
  .then(() => {
    Blog.create({
      title: 'New Blog Title 1',
      author: [
        {
          name: 'Jackdon',
        }, {
          name: 'Fackdon',
        }
      ],
    }, {
      title: 'New Blog Title 2',
      author: [
        {
          name: 'Jackdon',
        }, {
          name: 'Lisy',
        }
      ],
    }, {
      title: 'New Blog Title 3',
      author: [
        {
          name: 'Smily',
        }, {
          name: 'Fackdon',
        }
      ],
    })
    .then(() => {
      console.log('finished populating blogs');
    });
  });


Category.find({}).remove()
  .then(() => {
    Category.create({
      name: 'JavaScript',
      create_user: 'Jackdon',
      active: true,
    }, {
      name: 'Java',
      create_time: '2016-06-26 15:10:31',
      create_user: 'Jackdon',
      active: true,
    }, {
      name: 'HTML',
      create_time: '2016-06-26 15:10:31',
      create_user: 'Jackdon',
      active: true,
    }, {
      name: 'CSS',
      create_time: '2016-06-26 15:10:31',
      create_user: 'Jackdon',
      active: true,
    })
    .then(() => {
      console.log('finsished populating blogs');
    });
  });
