'use strict';

angular.module('snoopyApp', ['snoopyApp.auth', 'snoopyApp.admin', 'snoopyApp.home', 'snoopyApp.blog', 'snoopyApp.about', 'snoopyApp.blog.private.gallery',
    'snoopyApp.constants', 'ngCookies', 'ngResource', 'ngMessages', 'ngSanitize', 'ui.router', 'ui.bootstrap', 'validation.match', 'ngMaterial', 'oitozero.ngSweetAlert'
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  });
