'use strict';

angular.module('snoopyApp', ['snoopyApp.auth', 'snoopyApp.admin', 'snoopyApp.constants',
    'ngCookies', 'ngResource', 'ngSanitize', 'ui.router', 'ui.bootstrap', 'validation.match'
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  });
