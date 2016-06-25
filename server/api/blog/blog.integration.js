'use strict';

var app = require('../..');
import request from 'supertest';

var newBlog;

describe('Blog API:', function() {

  describe('GET /api/Blogs', function() {
    var Blogs;

    beforeEach(function(done) {
      request(app)
        .get('/api/Blogs')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          Blogs = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      Blogs.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/Blogs', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/Blogs')
        .send({
          name: 'New Blog',
          info: 'This is the brand new Blog!!!'
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
    });

    it('should respond with the newly created Blog', function() {
      newBlog.name.should.equal('New Blog');
      newBlog.info.should.equal('This is the brand new Blog!!!');
    });

  });

  describe('GET /api/Blogs/:id', function() {
    var Blog;

    beforeEach(function(done) {
      request(app)
        .get('/api/Blogs/' + newBlog._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          Blog = res.body;
          done();
        });
    });

    afterEach(function() {
      Blog = {};
    });

    it('should respond with the requested Blog', function() {
      Blog.name.should.equal('New Blog');
      Blog.info.should.equal('This is the brand new Blog!!!');
    });

  });

  describe('PUT /api/Blogs/:id', function() {
    var updatedBlog;

    beforeEach(function(done) {
      request(app)
        .put('/api/Blogs/' + newBlog._id)
        .send({
          name: 'Updated Blog',
          info: 'This is the updated Blog!!!'
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
    });

    afterEach(function() {
      updatedBlog = {};
    });

    it('should respond with the updated Blog', function() {
      updatedBlog.name.should.equal('Updated Blog');
      updatedBlog.info.should.equal('This is the updated Blog!!!');
    });

  });

  describe('DELETE /api/Blogs/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/Blogs/' + newBlog._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when Blog does not exist', function(done) {
      request(app)
        .delete('/api/Blogs/' + newBlog._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
