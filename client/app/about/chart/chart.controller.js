/**
 * Created by xulingming on 2017/3/30.
 */
'use strict';

(function () {

  function LoginChartCtrl($scope, ChartService) {

    this.$injector = ['$scope', 'ChartService'];
    // chart.js docs: http://www.chartjs.org/docs/#

    var dataset_backgroundColor = ['rgba(122, 202, 55, 0.4)', 'rgba(205, 180, 255, 0.4)'];
    var dataset_borderColor = ['rgba(122, 202, 55, 0.9)', 'rgba(205, 180, 255, 0.9)'];

    $scope.labels = [];
    $scope.series = ['Total', 'Today'];
    $scope.optionsBar = {
      legend: {
        display: true,
        position: 'top',
        fullWidth: true,
        labels: {
          boxWidth: 20
        },
        reverse: false
      },
      scales: {
        yAxes: [
          {
            id: 'y-axis-1',
            type: 'linear',
            display: true,
            position: 'left'
          }
        ]
      }
    };
    $scope.datasetOverrideBar = [
      {
        label: '总次数',
        backgroundColor: dataset_backgroundColor[0],
        borderColor: dataset_borderColor[0],
        yAxisID: 'y-axis-1'
      },
      {
        label: '今日',
        backgroundColor: dataset_backgroundColor[1],
        borderColor: dataset_borderColor[1],
        yAxisID: 'y-axis-1'
      }
    ];
    $scope.datasetOverrideLine = [
      {
        label: '总次数',
        backgroundColor: dataset_backgroundColor[0],
        borderWidth: 1,
        yAxisID: 'y-axis-1',
        pointStyle: 'star',
        pointBackgroundColor: 'rgba(223, 202, 55, 0.8)'
      },
      {
        label: '今日',
        backgroundColor: dataset_backgroundColor[1],
        borderWidth: 1,
        yAxisID: 'y-axis-1'
      }
    ];
    $scope.optionsLine = {
      legend: {
        display: true,
        position: 'top',
        fullWidth: true,
        labels: {
          boxWidth: 20,
        },
        reverse: false
      },
      scales: {
        yAxes: [
          {
            id: 'y-axis-1',
            type: 'linear',
            display: true,
            position: 'left'
          }
        ]
      }
    };

    $scope.colors = ['#FF5588', '55FF88'];

    $scope.data = [
      [],[]
    ];

    $scope.dataRadar = [
      [65, 59, 90, 81, 56, 55, 40],
      [28, 48, 40, 19, 96, 27, 100],
      [88, 16, 60, 45, 11, 15, 69],
    ];
    $scope.radarLabels = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    $scope.radarOptions = {
      legend: {
        display: true,
        fullWidth: true,
        onClick: function (event, legendItem) {

        },
        onHover: function (event, legendItem) {
        },
        labels: {
          boxWidth: 20
        },
        reverse: false
      }
    };
    $scope.radarDatasetOverrides = [
      {
        label: 'A',
        backgroundColor: "rgba(192,72,192,0.4)",
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(192,75,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
      },
      {
        label: 'B',
        backgroundColor: "rgba(192,192,72,0.4)",
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(192,75,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
      },
      {
        label: 'C',
        backgroundColor: "rgba(72,192,192,0.4)",
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(192,75,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2
      }
    ];

    $scope.type = 'polarArea';
    $scope.baseData = [300, 500, 100, 40, 120];
    $scope.baseLabels = ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"];

    $scope.toggle = function () {
      $scope.type = $scope.type === 'polarArea' ?
        'pie' : 'polarArea';
    };

    refreshLoginData();

    function refreshLoginData() {
      $scope.labels = [];
      $scope.data = [[],[]];
      return ChartService.getLoginData()
        .$promise
        .then(function (loginData) {
          parseChartData(loginData);
          return loginData;
        }).catch(function (err) {
          return [];
      });
    }

    $scope.refreshLoginData = refreshLoginData;

    function parseChartData(d) {
      if (d && angular.isArray(d)) {
        d.forEach(function (e) {
          $scope.labels.push(e.user.name);
          $scope.data[0].push(e.login.login_count);
          $scope.data[1].push(e.login.today_login);
        });
      }
    }

    function customTooltips() {
      return function (tooltip) {
        // tooltip will be false if tooltip is not visible or should be hidden
        if (!tooltip) {
          return;
        }

        // Otherwise, tooltip will be an object with all tooltip properties like:

        // tooltip.caretSize
        // tooltip.caretPadding
        // tooltip.chart
        // tooltip.cornerRadius
        // tooltip.fillColor
        // tooltip.font...
        // tooltip.text
        // tooltip.x
        // tooltip.y
        // tooltip.caretX
        // tooltip.caretY
      }
    }

  }



  angular.module('snoopyApp.about.chart')
    .controller('LoginChartCtrl', LoginChartCtrl);

})();
