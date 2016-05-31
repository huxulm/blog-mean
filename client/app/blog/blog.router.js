'use strict';

angular.module('snoopyApp.blog')
  .config(function($stateProvider) {
    $stateProvider.state('blog', {
      url: '/blog',
      templateUrl: 'app/blog/blog.html',
      controller: 'BlogController',
      controllerAs: 'blog',
      authenticate: 'blog'
    });
  });
