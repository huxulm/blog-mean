'use strict';

angular.module('snoopyApp', ['snoopyApp.auth', 'snoopyApp.admin', 'snoopyApp.blog', 'snoopyApp.about', 'snoopyApp.constants',
    'ngCookies', 'ngResource', 'ngSanitize', 'ui.router', 'ui.bootstrap', 'validation.match',
    'ngMaterial'
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  });
