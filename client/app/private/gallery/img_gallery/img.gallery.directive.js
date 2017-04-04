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
            lightGallery(document.getElementById('fixed-size'), {
              width: '700px',
              height: '470px',
              mode: 'lg-lollipop',
              addClass: 'fixed-size',
              counter: false,
              download: false,
              startClass: '',
              enableSwipe: false,
              enableDrag: false,
              speed: 500
            });
          }
        };
      }

    };
    return defObj;
  }

  function ImgGalleryCtrl($scope) {
    this.$injector = ['$scope'];
    $scope.test = 'TEST TEXT';
  }

  angular.module('snoopyApp.blog.private.gallery')
    .controller('ImgGalleryCtrl', ImgGalleryCtrl);
  angular.module('snoopyApp.blog.private.gallery')
    .directive('imgGallery', ImgGallery);
})();
