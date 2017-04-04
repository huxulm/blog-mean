/**
 * Created by xulingming on 2017/4/3.
 */
'use strict';
(function () {
  function GalleryCtrl($scope) {
    this.$injector = ['$scope'];
    
    $scope.galleryMode = [{mode: 0, desc: 'WATER'}, {mode: 1, desc: 'GALLERY'}];
  }
  
  angular.module('snoopyApp.blog.private.gallery')
    .controller('GalleryCtrl', GalleryCtrl);
})();
