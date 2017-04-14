/**
 * Created by xulingming on 2017/4/6.
 */
'use strict';
(function () {
  function Gallery() {
    var defObj = {
      priority: 0,
      transclude: false,
      restrict: 'EA',
      scope: false,
      controller: 'GalleryCtrl',
      controllerAs: 'galCtrl',
      bindToController: true,
      multiElement: false,
      compile: function compile(tElement, tAttrs, transclude) {
        return {
          pre: function preLink(scope, iElement, iAttrs, galCtrl) {
            console.log('Attrs:', iElement, iAttrs, galCtrl);
          },
          post: function postLink(scope, iElement, iAttrs, galCtrl) {
            console.log('Attrs:', iElement, iAttrs, galCtrl);
          }
        };
      }

    };
    return defObj;
  }

  angular.module('snoopyApp.blog.private.gallery')
    .directive('gallery', Gallery);
})();
