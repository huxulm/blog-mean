/**
 * Created by xulingming on 2017/3/30.
 */
'use strict';

(function () {

  function LoginChartCtrl($scope, ChartService) {

    this.$injector = ['$scope', 'ChartService'];

    $scope.options = {
      title: {
        display: false,
        // text: 'Custom Chart Title'
      },
      legend: {
        display: true,
        position: 'top',
        fullWidth: true,
        onClick: function (event, legendItem) {

        },
        onHover: function (event, legendItem) {
          console.log('onhover:', event, legendItem);
        },
        labels: {
          boxWidth: 20,
        },
        reverse: false
      },
      tooltips: {
        custom: customTooltips(),
        callbacks: {
          title: function (tooltipItems, data) {
            // console.log('title callback:', tooltipItems, ',\ndata:', data);
/*            data.datasets[0].label = '总次数';
            data.datasets[1].label = '今日';*/
          }
        }
      }
    };

    $scope.labels = [];
    $scope.series = ['Total', 'Today'];
    $scope.datasetOverride = [
      {
        label: "总次数",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        spanGaps: false,
      },

      {
        label: "今日",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(192,72,192,0.4)",
        borderColor: "rgba(192,75,192,1)",
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "rgba(192,75,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(192,75,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        spanGaps: false,
      }

    ];

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
