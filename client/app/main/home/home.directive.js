/**
 * Created by xulingming on 2017/3/23.
 */
'use strict';
(function () {

  function HomeImage() {
    var defObj = {
      priority: 0,
      // template: '<div></div>', // or // function(tElement, tAttrs) { ... },
      // or
      // templateUrl: 'directive.html', // or // function(tElement, tAttrs) {},
      transclude: false,
      restrict: 'EA',
      // templateNamespace: 'html',
      scope: false,
      controller: function () {},
      bindToController: false,
      // require: 'siblingDirectiveName', // or // ['^parentDirectiveName', '?optionalDirectiveName', '?^optionalParent'],
      multiElement: false,
      compile: function compile(tElement, tAttrs, transclude) {
        return {
          pre: function preLink(scope, iElement, iAttrs, controller) {
          },
          post: function postLink(scope, iElement, iAttrs, controller) {
            iAttrs.$set('style', 'background-image:url(\"http://ww1.sinaimg.cn/crop.0.0.920.300/afe3ed99gw1f867y8d5ntj20pk08cq4s.jpg\")');
          }
        };
      }
    };
    return defObj;
  }

  angular.module('snoopyApp.home')
    .directive('imgHome', HomeImage);
})();
