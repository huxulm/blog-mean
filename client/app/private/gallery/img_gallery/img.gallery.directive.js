/**
 * Created by xulingming on 2017/4/3.
 */
'use strict';
(function () {

  // factory
  function ImgGallery() {
    // this.$injector = ['$rootScope', '$scope'];
    var defObj = {
      priority: 0,
      templateUrl: 'app/private/gallery/img_gallery/img.gallery.tmpl.html',
      transclude: false,
      restrict: 'EA',
      // templateNamespace: 'html',
      scope: false,
      controller: 'ImgGalleryCtrl',
      controllerAs: 'imgGalleryCtrl',
      bindToController: true,
      // require: 'siblingDirectiveName', // or // ['^parentDirectiveName', '?optionalDirectiveName', '?^optionalParent'],
      multiElement: false,
      compile: function compile(tElement, tAttrs, transclude) {
        return {
          pre: function preLink(scope, iElement, iAttrs, controller) {
            console.log('Attrs:', iElement, iAttrs, controller);
          },
          post: function postLink(scope, iElement, iAttrs, controller) {
            console.log('Attrs:', iElement, iAttrs, controller);
          }
        };
      }

    };
    return defObj;
  }

  function ImgGalleryCtrl($scope, AlbumService, $state, $stateParams,) {
    this.$injector = ['$scope', 'AlbumService'];
    this.$scope = $scope;
    this.$state = $state;
    this.$stateParams = $stateParams;
    $scope.test = 'TEST TEXT';
    this.$scope.items = [];
    this.$scope.directiveId = 'TEST_ID';

    this.$onInit = function () {
      this.loadItems();
    };

    this.loadItems = function () {
      AlbumService.getAlbumItems({
        type: 1,
        s: {a_id: $stateParams.aid}
      }).$promise.then(this.loadItemsCb())
        .catch(function (err) {

        });
    };

    var galOpts = {width: '700px', height: '470px', mode: 'lg-lollipop', addClass: 'fixed-size', counter: false, download: false, startClass: '', enableSwipe: false, enableDrag: false, speed: 500};

    this.loadItemsCb = function () {
      return function (data) {
        if (data && data.hasOwnProperty('docs')) {
           $scope.items = [];
          $scope.items = data.docs || [];

          setTimeout(function () {
           lightGallery(document.getElementById('gallery_id_0'), galOpts);
           }, 2000);
        }
      };
    }
  }

  angular.module('snoopyApp.blog.private.gallery')
    .controller('ImgGalleryCtrl', ImgGalleryCtrl);
  angular.module('snoopyApp.blog.private.gallery')
    .directive('imgGallery', ImgGallery);
})();
