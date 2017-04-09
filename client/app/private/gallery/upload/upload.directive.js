/**
 * Created by xulingming on 2017/4/9.
 */
'use strict';
(function () {
  function UploadAlbum() {
    var defObj = {
      priority: 0,
      transclude: false,
      restrict: 'EA',
      scope: false,
      templateUrl: 'app/private/gallery/upload/upload.html',
      controller: 'GalleryCtrl',
      controllerAs: 'galCtrl',
      // bindToController: true,
      // require: '^gallery', // or // ['^parentDirectiveName', '?optionalDirectiveName', '?^optionalParent'],
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
    .directive('uploadAlbum', UploadAlbum);
})();
