/**
 * Created by xulingming on 2017/1/2.
 */
'use strict';
angular.module('snoopyApp.about')
    .config(function ($stateProvider) {
        $stateProvider.state('main.about', {
            url : 'about',
            templateUrl: 'app/about/about.html',
            controller : 'AboutController',
            controllerAs : 'about',
        });
    });