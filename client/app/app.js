'use strict';

angular.module('snoopyApp', ['snoopyApp.auth', 'snoopyApp.admin', 'snoopyApp.home', 'snoopyApp.blog', 'snoopyApp.about', 'snoopyApp.blog.private.gallery',
    'snoopyApp.constants', 'ngCookies', 'ngResource', 'ngMessages', 'ngSanitize', 'ui.router', 'ui.bootstrap', 'validation.match', 'ngMaterial', 'oitozero.ngSweetAlert'
  ])
  .config(function($urlRouterProvider, $locationProvider) {

    // direct to real home page
    $urlRouterProvider.when('/', '/home');
    $urlRouterProvider.otherwise('/home');

    $locationProvider.html5Mode(true);
  })
  .config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin resource loads.
      'self',
      // Allow loading from our assets domain. **.
      'https://sachinchoolur.github.io/lightgallery.js/static/img/**'
    ])});
