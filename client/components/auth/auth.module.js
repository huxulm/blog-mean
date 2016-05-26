'use strict';

angular.module('snoopyApp.auth', ['snoopyApp.constants', 'snoopyApp.util', 'ngCookies', 'ui.router'])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
