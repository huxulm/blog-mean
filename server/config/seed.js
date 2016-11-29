/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import Category from '../api/category/category.model';
import Blog from '../api/blog/blog.model';
import Comment from '../api/comment/comment.model';
import sqldb from '../sqldb';
import mongoose from 'mongoose';

var ObjectId = mongoose.Schema.Types.ObjectId;

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

/*sqldb.sequelize
  .authenticate()
  .then(function(err) {
    console.log('Mysql connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });*/


Blog.find({}).remove()
  .then(() => {
    Blog.create({
      title: 'New Blog Title 1',
      author: 'Jackdon',
      // author_id: ObjectId('5827effcb725baa40f28195e'),
      create_time: new Date(),
      // category: ObjectId('5827effcb725baa40f281962'),
      html_content: '上个世纪有一把排位赛，日本队从1931年开局就把中国队压得抬不起头来。37年日本队开始全线猛攻，中国队一度被打得三路全破，水晶不保。38年的时候，中国队这边有人说日本人优势太大，这边技术不如人装备不如人配合还不行，干脆投了吧。队长拒绝投降后这人骂',
    }, {
      title: 'New Blog Title 2',
      author: 'Jackdon',
      author_id: ObjectId('5827effcb725baa40f281966'),
      create_time: new Date(),
      category: new mongoose.Types.ObjectId('5827effcb725baa40f28195f'),
      html_content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sollicitudin tincidunt mauris vitae venenatis. Aliquam vel pharetra felis. Donec blandit nec nibh sit amet tempor. Donec efficitur orci ut elit ultrices interdum. Nulla tristique a nisi non placerat. Pellentesque auctor purus eget eleifend mattis. Maecenas tincidunt sem ut neque lacinia, vitae venenatis metus consectetur. Quisque accumsan felis in urna viverra, vitae fringilla sapien malesuada. Sed vitae neque ut mi scelerisque euismod. Nullam felis purus, venenatis id aliquam sit amet, laoreet a leo.',
    }, {
      title: 'New Blog Title 4',
      author: 'Jackdon',
      author_id: ObjectId('5827effcb725baa40f281963'),
      create_time: new Date(),
      category: new mongoose.Types.ObjectId('5827effcb725baa40f281964'),
      html_content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sollicitudin tincidunt mauris vitae venenatis. Aliquam vel pharetra felis. Donec blandit nec nibh sit amet tempor. Donec efficitur orci ut elit ultrices interdum. Nulla tristique a nisi non placerat. Pellentesque auctor purus eget eleifend mattis. Maecenas tincidunt sem ut neque lacinia, vitae venenatis metus consectetur. Quisque accumsan felis in urna viverra, vitae fringilla sapien malesuada. Sed vitae neque ut mi scelerisque euismod. Nullam felis purus, venenatis id aliquam sit amet, laoreet a leo. Aenean mauris metus, varius eget sapien sed, ultrices hendrerit ipsum. In eget massa eu risus tincidunt varius a quis nunc. Sed in consequat magna. Aenean blandit felis vitae tempus eleifend. Etiam faucibus turpis sed ex venenatis tempor.',
    })
    .then(() => {
      console.log('finished populating blogs');
    });
  });

Category.find({}).remove()
  .then(() => {
    Category.create({
      name: 'JavaScript',
      level: '0',
    }, {
      name: 'Java',
      level: '0',
    }, {
      name: 'HTML',
      level: '0',
    }, {
      name: 'CSS',
      level: '0',
    })
    .then(() => {
      console.log('finsished populating blogs');
    });
  });


Thing.count({}, (err, count) => {
  if(!err) {
    console.log('After init Thing size: ' + count);
  }
});

Blog.count({}, (err, count) => {
  if(!err) {
    console.log('After init Blog size: ' + count);
  }
});

Comment.find({}).remove()
  .then(() => {
    // find one blog
    Blog.find({}).exec()
      .then((blog) => {
        console.log('初始化评论数据:' + JSON.stringify(blog));
        console.log('HTML内容:' + blog[0].html_content);
        Comment.create({
          content: '你的博客写的太精彩了!!!!',
          blog_id: blog[0]._id,
        });
      });
  });
