'use strict';

angular.module('snoopyApp.blog')
  .config(function($stateProvider) {
    $stateProvider.state('main.blog', {
      url: 'blog',
      templateUrl: 'app/blog/blog.html',
      controller: 'BlogController',
      controllerAs: 'blog'
    });
  });