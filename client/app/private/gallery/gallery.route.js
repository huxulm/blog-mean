/**
 * Created by xulingming on 2017/4/3.
 */
'use strict';

angular.module('snoopyApp.blog.private.gallery')
  .config(function ($stateProvider) {
    $stateProvider.state('main.gallery', {
      url: 'gallery',
      templateUrl: 'app/private/gallery/gallery.html',
      controller: 'GalleryCtrl',
      controllerAs: 'galCtrl'
    }).state('main.gallery.album', {
      url: '/:aid?uid&',
      template: '<img-gallery></img-gallery>'
    });
  });
