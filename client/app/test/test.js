var testApp = angular.module('testApp', ['ui.router']);

testApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/state1');
    
    $stateProvider.state('state1', {
        url: "/state1",
        templateUrl: "/app/test/state1.html"
    }).state('state1.list', {
        url: "/list",
        templateUrl: "/app/test/state1.list.html",
        controller: function ($scope) {
            $scope.items = ['A', 'List', 'Of', 'State1 Items'];
        }
    }).state('state2', {
        url: "/state2",
        templateUrl: "/app/test/state2.html",
    }).state('state2.list', {
        url: "/list",
        templateUrl: "/app/test/state2.list.html",
        controller: function ($scope) {
            $scope.items = ['A', 'List', 'Of', 'State2 Items'];
        }
    });;
});