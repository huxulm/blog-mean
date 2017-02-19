'use strict';

angular.module('snoopyApp')
  .config(function($stateProvider) {
    $stateProvider.state('main', {
      url: '/',
      template: '<main></main>'
    }).state('main.home', {
      url: 'home',
      templateUrl: 'app/main/home/home.html'
    });
  });
