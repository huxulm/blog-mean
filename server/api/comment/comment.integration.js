/**
 * Created by Dell on 2016/11/20.
 */
'use strict';

import app from '../..';
// import Comment from './comment.model';
// import Blog from '../blog/blog.model';
import request from 'supertest';


describe('Comment API:', function() {

  var newComment;

  describe('GET /api/comments', function() {
    var comments;

    beforeEach(function(done) {
      request(app)
        .get('/api/comments')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          comments = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      comments.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/comments', function () {
    beforeEach(function (done) {
      request(app)
        .post('/api/comments')
        .send({
          content: 'This is a perfect blog!',
          author_id: '58316b60e85f60c0248683e1',
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newComment = res.body;
          done();
        })
    });

    it('should respond with the newly created comment', function() {
      newComment.content.should.equal('This is a perfect blog!');
      newComment.author_id.should.equal('58316b60e85f60c0248683e1');
    });
  });

  describe('GET /api/comments/:id', function () {
    var comment;

    beforeEach(function (done) {
      request(app)
        .get('/api/comments/' + newComment._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          comment = res.body;
          done();
        });
    });

    afterEach(function () {
      comment = {};
    });

    it('should respond with the requested comment', function() {
      comment.content.should.equal('This is a perfect blog!');
    });

  });

  describe('PUT /api/comments/:id', function () {
    var updatedComment;

    beforeEach(function (done) {
      request(app)
        .put('/api/comments/' + newComment._id)
        .send({
          content: newComment.content + '\nThis blog was written by me!',
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          updatedComment = res.body;
          console.log('-------------------->' + JSON.stringify(updatedComment));
          done();
        });
    });

    afterEach(function () {
      updatedComment = {};
    });

    it('should have a much long length of cmment length', function (done) {
      if (updatedComment.content.toString().endsWith('This blog was written by me!')) {
        done();
      } else {
        done(new Error('Comment update failed!'));
      }
    });
  });

  // describe('DELETE /api/comments/:id', function () {
  //   it('should response 204 with success removal', function (done) {
  //     request(app)
  //       .delete('/api/comments/' + newComment._id)
  //       .expect(204)
  //       .end(function (err, res) {
  //         if (err) {
  //           return done(err);
  //         }
  //         done();
  //       })
  //   });
  // });
});
