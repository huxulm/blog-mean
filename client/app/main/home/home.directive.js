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
            iAttrs.$set('style', 'background-image:url(\"http://images.sjq315.com/UploadFiles/Version2/4495/20161024/201610241440437499.jpg\")');

            /*var $imgParent = iElement.parent();
            console.log('parent element:' + iElement.parent());
            var $imgParentHeight = $imgParent.height();

            var $imgHeight = iElement.height();
            console.log('imgHeight:' + $imgHeight, ', parentHeight:' + $imgParentHeight);

            console.log('screen:' + 'width:' + window.screen.availWidth + ', height:' + window.screen.availHeight);
            console.log('screen:' + 'width:' + window.screen.width + ', height:' + window.screen.height);*/
          }
        };
      }
    };
    return defObj;
  }

  angular.module('snoopyApp.home')
    .directive('imgHome', HomeImage);
})();
