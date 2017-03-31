/**
 * Created by xulingming on 2017/3/30.
 */
'use strict';

(function () {

  function LoginChartCtrl($scope, ChartService) {

    // this.$injector = ['$scope'];
    $scope.options = {
      title: {
        display: true,
        text: 'Custom Chart Title'
      }
    };

    $scope.labels = [];
    $scope.series = ['Total', 'Today'];

    $scope.colors = ['#FF5588', '55FF88'];

    $scope.data = [
      [],[]
    ];

    ChartService.getLoginData()
      .$promise
      .then(function (loginData) {
        parseChartData(loginData);
      }).catch(function (err) {
      console.log('getLoginData went wrong:' + JSON.stringify(err));
    });

    function parseChartData(d) {
      if (d && angular.isArray(d)) {
        d.forEach(function (e) {
          $scope.labels.push(e.user.name);
          $scope.data[0].push(e.login.login_count);
          $scope.data[1].push(e.login.today_login);
        });
      }
    }

  }



  angular.module('snoopyApp.about.chart')
    .controller('LoginChartCtrl', LoginChartCtrl);

})();
