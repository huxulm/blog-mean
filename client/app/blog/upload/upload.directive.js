/**
 * Created by xulingming on 2017/3/16.
 */
'use strict';
(function () {

  function UploadImage() {
    var defObj = {
      priority: 0,
      // template: '<div></div>', // or // function(tElement, tAttrs) { ... },
      // or
      // templateUrl: 'directive.html', // or // function(tElement, tAttrs) {},
      transclude: false,
      restrict: 'A',
      // templateNamespace: 'html',
      scope: false,
      controller: 'DialogController',
      controllerAs: 'dialogCtrl',
      bindToController: false,
      // require: 'siblingDirectiveName', // or // ['^parentDirectiveName', '?optionalDirectiveName', '?^optionalParent'],
      multiElement: false,
      compile: function compile(tElement, tAttrs, transclude) {
        return {
          pre: function preLink(scope, iElement, iAttrs, controller) {
            swal('dialog pre...');
          },
          post: function postLink(scope, iElement, iAttrs, controller) {
            swal('dialog post...');
          }
        };
      }
    };
    return defObj;
  }

  // dialog view
  function DialogController($scope, $element, $attrs, $transclude, $mdDialog, FileUploader) {
    this.$scope = $scope;
    this.$scope.$mdDialog = $mdDialog;

    $scope.hide = function() {
      this.$scope.$mdDialog.hide();
    };

    $scope.cancel = function() {
      this.$scope.$mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      this.$scope.$mdDialog.hide(answer);
    };

    var uploader = $scope.uploader = new FileUploader({
      url: 'upload.php'
    });

    this.$scope.test = "test";

    this.$scope.showDialog = this.showDialog;
    this.$scope.hide = function() {
      this.$mdDialog.hide();
    };
    this.$scope.cancel = function() {
      this.$mdDialog.cancel();
    };
    this.$scope.answer = function(answer) {
      this.$mdDialog.hide(answer);
    };

    this.showDialog = function (ev) {
      var $this = this;
      this.$scope.$mdDialog.show({
        controller: this.imageCtrl(this),
        templateUrl: 'app/blog/upload/dialog.tmpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        // fullscreen: this.$scope.customFullscreen // Only for -xs, -sm breakpoints.
      })
        .then(function(answer) {
          $this.$scope.status = 'You said the information was "' + answer + '".';
        }, function(e) {
          $this.$scope.status = 'You cancelled the dialog.';
        });
    };

    this.imageCtrl = function (ctx){
      return function ($scope, FileUploader) {
        console.log('image ctrl...');
        $scope.cancel = ctx.$scope.cancel;
        $scope.hide = ctx.$scope.hide;
        $scope.answer = ctx.$scope.answer;
        $scope.$mdDialog = ctx.$scope.$mdDialog;
        $scope.test = "test...";

        var uploader = $scope.uploader = new FileUploader({
          url: '/api/upload'
        });

        uploader.filters.push({
          name: 'imageFilter',
          fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
          }
        });

        // CALLBACKS

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
        };
        uploader.onProgressItem = function(fileItem, progress) {
          console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
          console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
          console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
          console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
          console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
          console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
          console.info('onCompleteAll');
        };
      }
    };
  }

  angular.module('snoopyApp.blog.upload')
    .controller('DialogController', DialogController);
  angular.module('snoopyApp.blog.upload')
    .directive('uploadImage', UploadImage);

})();
