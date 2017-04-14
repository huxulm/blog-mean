/**
 * 构建统一风格的selector组件
 * Created by xulingming on 2017/4/11.
 */
'use strict';
(function () {
  function Selector() {
    var defObj = {
      priority: 0,
      transclude: false,
      restrict: 'E',
      // controller: 'SelectorCtrl',
      // controllerAs: 'selCtrl',
      scope: {
        snSelData: '=?'
      },
      templateUrl: 'components/selector/selector.tmpl.html',
      multiElement: true,
      compile: function compile($scope, element, attrs, transclude) {
        return {
          pre: function preLink(scope, element, attrs) {
            console.log('Attrs:', scope, element, attrs);
            if (!scope.snSelData || !_.isArray(scope.snSelData)) {
              throw new Error('snSelData must be an array.');
            } else {
              scope.snSelData = scope.snSelData.map(function (e) {
                return {prop: e.property || '', value: e.value || 'null'};
              });
            }
          },
          post: function postLink(scope, element, attrs) {
            console.log('Attrs:', scope, element, attrs);
          }
        };
      }

    };
    return defObj;
  }

  angular.module('snoopyApp')
    .directive('snSelect', Selector);
})();
