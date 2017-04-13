'use strict';

import app from '../../..';
import AlbumDir from './albumDir.model';
import AlbumItem from './albumItem.model';
import User from './../../user/user.model';
import request from 'supertest';

describe('Album API:', function() {

  var user;
  var nwAlbumDir;

  before(function () {
    let rs = Promise.all([User.remove(), AlbumDir.remove()]).then(function () {
      user = new User({
        name: 'Test',
        email: 'test@example.com',
        password: 'password'
      });

      let promises = {
        user: user.save()
      };

      return promises.user.then(function (user) {
        let albumDirPromises = [
          new AlbumDir({
            name: 'Album NO.1',
            uid: user._id
          }).save(),
          new AlbumDir({
            name: 'Album NO.2',
            uid: user._id
          }).save()
        ];

        return Promise.all(albumDirPromises).then(function (data) {
          let result = {
            user: user,
            albums: data
          };
          console.log('Finaly result: ', JSON.stringify(result));
          return result;
        }).catch(function (err) {
          console.log('ERROR 2:', err);
        });
      }).catch(function (err) {
        console.log('ERROR 1:', err);
      });

    });

    console.log('Finaly result: ', JSON.stringify(rs));
  });

  describe('POST /api/upload/albums', function() {
    var token;

    before(function(done) {
      request(app)
        .post('/auth/local')
        .send({
          email: 'test@example.com',
          password: 'password'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          token = res.body.token;
          done();
        });
    });

    it('should respond with a album profile when created', function(done) {
      request(app)
        .post('/api/upload/albums')
        .set('authorization', 'Bearer ' + token)
        .send({
          name: 'Nature Album',
          uid: user._id
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          res.body.uid.toString().should.equal(user._id.toString());
          nwAlbumDir = res.body;
          done();
        });
    });

  });

  describe('GET /api/upload/albums/:id', function () {
    var token;

    before(function(done) {
      request(app)
        .post('/auth/local')
        .send({
          email: 'test@example.com',
          password: 'password'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            throw new Error(err);
          }
          token = res.body.token;
          done();
        });
    });

    it('should respond with a album when id provided', function(done) {
      request(app)
        .get('/api/upload/albums/' + nwAlbumDir._id + '?type=0')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            throw new Error(err);
          }
          console.log('Get album:', res.body);
          done();
        });
    });

  });

  describe('GET /api/upload/albums/page', function () {
    var token;

    before(function(done) {
      request(app)
        .post('/auth/local')
        .send({
          email: 'test@example.com',
          password: 'password'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            throw new Error(err);
          }
          token = res.body.token;
          done();
        });
    });

    it('should respond with a album page result', function(done) {
      request(app)
        .get('/api/upload/albums/page?type=1&page=1&limit=5&s=' + encodeURI('{\"name\": \"Nature pic 1\"}'))
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            throw new Error(err);
          }
          console.log('Get album page:', res.body);
          done();
        });
    });

  });

});
