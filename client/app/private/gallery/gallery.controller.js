/**
 * Created by xulingming on 2017/4/3.
 */
'use strict';
(function () {
  function GalleryCtrl($scope, $mdDialog, AlbumService, Util, FileUploader) {
    this.$inject = ['$scope', '$mdDialog', Util];
    console.log('GalleryCtrl inject:', arguments);

    $scope.galleryMode = [{mode: 0, desc: 'WATER'}, {mode: 1, desc: 'GALLERY'}];

    this.$onInit = function () {
      console.log('on init...');
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

    this.cb = function (fileItem, response, status, headers) {
      // upload callback
    };

    // 加载相册
    this.loadAlbums = $scope.loadAlbums = function (cb) {
      // TODO
      AlbumService.getAlbumDirs({page: 1, limit: 10}).$promise.then(function (rs) {
        console.log('Load album dirs:', rs || {});
        albumsLoadedCb(rs.docs || []);

        if(cb && angular.isFunction(cb)) {
          cb();
        }
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

      /*setTimeout(function () {
        lightGallery(document.getElementById('gallery_id'), galOpts);
      }, 2000);*/
    };

    $scope.createAlbum = function (album) {
      if (!album) {
        swal('相册名称不可为空！');
      }
    }

    this.$onChanges = function (changeObj) {
      console.log('On change:' + JSON.toString(changeObj));
    }
  }

  function DialogCtrl(ctx) {
    var _dialogCtrl = function ($scope, $mdDialog, $cookies, FileUploader) {
      console.log('DialogCtrl ctx:', ctx);
      DialogCtrl.prototype = ctx;
      this.$scope = $scope;
      this.$cookies = $cookies;
      this.$mdDialog = $mdDialog;
      this.$scope.nwAlbum = {};
      this.$scope.field = 'field text';

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
        if (ctx.cb) {
          ctx.cb(fileItem, response, status, headers);
        }

        // close dialog in 2000 ms
        setTimeout($scope.closeUploadDialog, 2000);
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

    };
    _dialogCtrl.$inject = ['$scope', '$mdDialog', '$cookies', 'FileUploader'];
    return _dialogCtrl;
  }

  angular.module('snoopyApp.blog.private.gallery')
    .controller('GalleryCtrl', GalleryCtrl);
})();
