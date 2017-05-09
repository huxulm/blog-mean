/**
 * Created by xulingming on 2017/4/3.
 */
'use strict';
(function () {
  function GalleryCtrl($scope, $mdDialog, $timeout, AlbumService, Util, FileUploader) {
    this.$inject = ['$scope', '$mdDialog', Util];
    console.log('GalleryCtrl inject:', arguments);

    $scope.galleryMode = [{mode: 0, desc: 'WATER'}, {mode: 1, desc: 'GALLERY'}];

    this.$onInit = function () {
      console.log('on init...');
      this.loadAlbums();
    };

    // 上传图片
    this.uploadImg = function (ev) {
      $mdDialog.show({
        controller: DialogCtrl(this),
        templateUrl: 'app/private/gallery/upload/upload.dialog.tmpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
    };

    // 加载相册
    this.loadAlbums = $scope.loadAlbums = function (cb) {
      $scope.albums = [];
      // TODO
      return AlbumService.getAlbumDirs({page: 1, limit: 10}).$promise.then(function (rs) {
        console.log('Load album dirs:', rs || {});

        return $timeout(function () {
          return albumsLoadedCb(rs.docs || []);
        }, 2000);

/*        if(cb && angular.isFunction(cb)) {
          cb();
        }*/
      });
    };


    var galOpts = {width: '700px', height: '470px', mode: 'lg-lollipop', addClass: 'fixed-size', counter: false, download: false, startClass: '', enableSwipe: false, enableDrag: false, speed: 500};

    var albumsLoadedCb = function (data) {
      $scope.albums = data;
      $scope.albums.map(function (e) {
        e.create_time = new Date(e.create_time).toLocaleString();
        e.last_upload_time = new Date(e.last_upload_time).toLocaleString();
        return e;
      });
      return $scope.albums;
    };

    var createModes = ['ADD', 'SAVE'];
    $scope.curCreateMode = createModes[0];

    $scope.createAlbum = function (album) {

      if ($scope.curCreateMode == createModes[0]) {
        $scope.curCreateMode = createModes[1];
        return;
      } else if ($scope.curCreateMode == createModes[1]){ // 'SAVE'
        $scope.curCreateMode = createModes[0];
      }

      if ($scope.nwAlbumName) {
        album = $scope.nwAlbumName;
      }
      if (!album) {
        swal('相册名称不可为空！');
      } else {
        AlbumService.createAlbum({name: album, token: 'test'})
          .$promise
          .then(createAlbumCb);
      }
    };

    var createAlbumCb = function (data) {
      if (data) {
        if (!$scope.albums) {
          $scope.albums = [];
        }
        $scope.albums.push(data);
        // tip success
        swal('Add album:' + (data.name || '') + 'success!');
      }
    };

    this.$onChanges = function (changeObj) {
      console.log('On change:' + JSON.toString(changeObj));
    }
  }

  function DialogCtrl(ctx) {
    var _dialogCtrl = function ($scope, $mdDialog, $cookies, FileUploader, AlbumService) {
      console.log('DialogCtrl ctx:', ctx);
      DialogCtrl.prototype = ctx;
      this.$scope = $scope;
      this.$cookies = $cookies;
      this.$mdDialog = $mdDialog;
      this.$scope.nwAlbum = {};
      this.$scope.field = 'field text';

      ctx.cb = this.createAlbumCb;

      var uploader = $scope.uploader = new FileUploader({
        url: '/api/upload',
        headers: {
          'X-XSRF-TOKEN': $cookies.get('XSRF-TOKEN') || '',
          'Authorization': 'Bearer ' + ($cookies.get('token') || '')
        }
      });

      uploader.filters.push({
        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
          var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
          return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
      });

      // CALLBACKS
      // TODO
      uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        console.info('onWhenAddingFileFailed', item, filter, options);
      };
      uploader.onAfterAddingFile = function(fileItem) {
        console.info('onAfterAddingFile', fileItem);
      };
      uploader.onAfterAddingAll = function(addedFileItems) {
        console.info('onAfterAddingAll', addedFileItems);
      };
      uploader.onBeforeUploadItem = function(item) {
        console.info('onBeforeUploadItem', item);
        item.formData['type'] = 0;
        item.formData['album_id'] = 'K9977EDs01';
      };
      uploader.onProgressItem = function(fileItem, progress) {
        console.info('onProgressItem', fileItem, progress);
      };
      uploader.onProgressAll = function(progress) {
        console.info('onProgressAll', progress);
      };
      uploader.onSuccessItem = function(fileItem, response, status, headers) {
        console.info('onSuccessItem', fileItem, response, status, headers);
        if (status == 200 && response && response.status === '1') {
          uploadedImgs = response.data.files || [];
        } else {
          swal('图片上传失败.');
        }
        createAlbumCb(fileItem, response, status, headers);
      };
      uploader.onErrorItem = function(fileItem, response, status, headers) {
        if (status === 401) {
          swal('未登录,图片上传失败.')
        }
        console.info('onErrorItem', fileItem, response, status, headers);
        if (ctx.cb) {
          ctx.cb(fileItem, response, status, headers);
        }
      };
      uploader.onCancelItem = function(fileItem, response, status, headers) {
        console.info('onCancelItem', fileItem, response, status, headers);
        if (ctx.cb) {
          ctx.cb(fileItem, response, status, headers);
        }
      };
      uploader.onCompleteItem = function(fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);
      };
      uploader.onCompleteAll = function() {
        console.info('onCompleteAll');
      };

      $scope.closeUploadDialog = function () {
        $mdDialog.cancel();
      };

      $scope.uploadAll = function () {
        uploader.uploadAll();
      }

      $scope.uploadAlbumImgs = function () {
        uploadedImgs = [];
        if (!$scope.selectedAlbum) {
          swal("Please select an album to upload your images.");
        }
        uploader.uploadAll();
      };

      // 成功上传的图片
      var uploadedImgs = [];
      var createAlbumCb = function () {
        var data = [];
        if (arguments && arguments.length == 4) {

          uploadedImgs.forEach(function (e) {
            data.push({url: e.url, name: e.filename, albumId: $scope.selectedAlbum._id});
          });
          AlbumService.createAlbumItems({items: data}).$promise.then(r => {
            if (r) {
              ctx.loadAlbums();
            }
          });
        } else {
          swal('上传图片到相册[' + $scope.selectedAlbum + ']失败.');
        }
      };

    };
    _dialogCtrl.$inject = ['$scope', '$mdDialog', '$cookies', 'FileUploader', 'AlbumService'];
    return _dialogCtrl;
  }

  angular.module('snoopyApp.blog.private.gallery')
    .controller('GalleryCtrl', GalleryCtrl);
})();
