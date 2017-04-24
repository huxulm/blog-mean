/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import Category from '../api/category/category.model';
import Blog from '../api/blog/blog.model';
import Comment from '../api/comment/comment.model';
import Tag from '../api/blog/tag/tag.model';
import AlbumDir from '../api/upload/album/albumDir.model';
import AlbumItem from '../api/upload/album/albumItem.model';
import env from './environment';

if (env.seedInfo.initUser) {
  User.find({}).remove()
    .then(() => {
      User.create({
        provider: 'local',
        name: 'jackdon',
        email: 'jackdon@gmail.com',
        password: 'xlmxlm00a'
      }, {
        provider: 'local',
        role: 'admin',
        name: 'Admin',
        email: 'admin@example.com',
        password: 'admin'
      }, {
        provider: 'local',
        role: 'test',
        name: 'test',
        email: 'test@example.com',
        password: 'test'
      })
        .then(() => {
          console.log('finished populating users');
        });
    });
}

if (env.seedInfo.initCategory) {
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
          console.log('finished populating categories');
        });
    });
}

if (env.seedInfo.initTag) {
  Tag.find({}).remove()
    .then(() => {
      Tag.create({tag: 'JavaScript'}, {tag: 'Java'}, {tag: 'HTML'}, {tag: 'CSS'})
        .then(() => {
          console.log("finished populating tags");
        });
    });  
}

if (env.seedInfo.initAlbum) {

// Album init
  var user = new User({
    name: 'Album user',
    email: 'album.user@example.com',
    password: 'password'
  });

  Promise.all([AlbumDir.remove(), AlbumItem.remove()])
    .then(function () {
      user.save().then(function (user) {
        let albumDirPromises = [
          new AlbumDir({
            name: 'Album NO.1',
            uid: user._id
          }).save(),
          new AlbumDir({
            name: 'Album NO.2',
            uid: user._id
          }).save(),
          new AlbumDir({
            name: 'Album NO.3',
            uid: user._id
          }).save()
        ];

        return Promise.all(albumDirPromises).then(function (data) {
          let result = {
            user: user,
            albums: data
          };
          return result;
        }).then(function (rs) {
          if (rs && rs.albums) {
            var promises = [];
            rs.albums.forEach(function (album) {
              if (!album) return;
              let albumItems = [];
              for (var i = 0; i < 50; i++) {
                albumItems.push(new AlbumItem({
                  name: album.name + '- ITEM - ' + i,
                  url: 'https://sachinchoolur.github.io/lightgallery.js/static/img/1.jpg',
                  a_id: album._id
                }).save());
              }
              console.log('Single album:', album);
              promises.push(albumItems);
            });

            return Promise.all(promises).then(function (data) {
              rs.albumItems = data;
              console.log('album result: ', JSON.stringify(rs));
              return rs;
            });
          }
        })
          .catch(function (err) {
            console.log('ERROR 2:', err);
          });
      });
    });
}
