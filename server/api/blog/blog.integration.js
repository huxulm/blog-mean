'use strict';

var app = require('../..');
import request from 'supertest';
import _ from 'lodash';
import User from '../user/user.model';
var newBlog = {};

describe('Blog API:', function() {
  var user;
  var token;

  before(function () {
    return User.remove().then(function () {
      user = new User({
        name: 'test',
        email: 'test@example.com',
        password: 'password'
      });
      return user.save();
    });
  });

  describe('GET /api/blogs', function() {
    var blogs;

    request(app)
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        blogs = res.body;
        done();
      });

    it('should respond with JSON array', function() {
      blogs.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/blogs', function() {
    request(app)
      .post('/api/blogs')
      .send({
        title: 'New Blog',
        text_content: 'This is the brand new blog!!!'
      })
      .expect(201)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        newBlog = res.body;
        done();
      });

    it('should respond with the newly created blog', function() {
      newBlog.title.should.equal('New Blog');
      newBlog.text_content.should.equal('This is the brand new blog!!!');
    });

  });

  describe('GET /api/blogs/:id', function() {
    var blog;

    request(app)
      .get('/api/blogs/' + newBlog._id || '')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        blog = res.body;
        done();
      });

    it('should respond with the requested blog', function() {
      blog.title.should.equal('New Blog');
      blog.text_content.should.equal('This is the brand new blog!!!');
    });

  });

  describe('PUT /api/blogs/:id', function() {
    var updatedBlog;

    request(app)
      .put('/api/blogs/' + newBlog._id)
      .send({
        title: 'Updated Blog',
        text_content: 'This is the updated blog!!!'
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        updatedBlog = res.body;
        done();
      });

    after(function() {
      updatedBlog = {};
    });

    it('should respond with the updated blog', function() {
      updatedBlog.title.should.equal('Updated Blog');
      updatedBlog.text_content.should.equal('This is the updated blog!!!');
    });

  });

  describe('DELETE /api/blogs/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/blogs/' + newBlog._id || '')
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when blog does not exist', function(done) {
      request(app)
        .delete('/api/blogs/' + newBlog._id || '')
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

  beforeEach(function (done) {
    request(app)
      .post('/auth/local')
      .send({
        email: user.email,
        password: 'password'
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        token = res.body.token;
      });
  });

});
