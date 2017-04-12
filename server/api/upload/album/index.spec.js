'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var albumCtrlStub = {
  index: 'albumCtrl.index',
  show: 'albumCtrl.show',
  createAlbumDir: 'albumCtrl.createAlbumDir'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var albumIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './album.controller': albumCtrlStub
});

describe('album API Router:', function() {

  it('should return an express router instance', function() {
    albumIndex.should.equal(routerStub);
  });

  describe('GET /api/upload/albums', function() {

    it('should route to album.controller.index', function() {
      routerStub.get
        .withArgs('/', 'albumCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/upload/albums/:id', function() {

    it('should route to album.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'albumCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/upload/albums', function() {

    it('should route to album.controller.createAlbumDir', function() {
      routerStub.post
        .withArgs('/', 'albumCtrl.createAlbumDir')
        .should.have.been.calledOnce;
    });

  });

});
