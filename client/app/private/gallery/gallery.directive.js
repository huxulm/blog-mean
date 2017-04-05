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
      // templateNamespace: 'html',
      scope: false,
      controller: 'GalleryCtrl',
      controllerAs: 'galCtrl',
      bindToController: true,
      // require: 'siblingDirectiveName', // or // ['^parentDirectiveName', '?optionalDirectiveName', '?^optionalParent'],
      multiElement: false,
      compile: function compile(tElement, tAttrs, transclude) {
        return {
          pre: function preLink(scope, iElement, iAttrs, galCtrl) {
            console.log('Attrs:', iElement, iAttrs, galCtrl);
          },
          post: function postLink(scope, iElement, iAttrs, controller) {
            console.log('Attrs:', iElement, iAttrs, controller);
            lightGallery(document.getElementById('gallery_id'),{
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

  angular.module('snoopyApp.blog.private.gallery')
    .directive('gallery', Gallery);
})();
