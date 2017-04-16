/**
 * Created by xulingming on 2017/4/3.
 */
'use strict';
(function () {

  // factory
  function ImgGallery() {
    // this.$injector = ['$rootScope', '$scope'];
    var defObj = {
      priority: 0,
      templateUrl: 'app/private/gallery/img_gallery/img.gallery.tmpl.html',
      transclude: false,
      restrict: 'EA',
      // templateNamespace: 'html',
      scope: false,
      controller: 'ImgGalleryCtrl',
      controllerAs: 'imgGalleryCtrl',
      bindToController: true,
      // require: 'siblingDirectiveName', // or // ['^parentDirectiveName', '?optionalDirectiveName', '?^optionalParent'],
      multiElement: false,
      compile: function compile(tElement, tAttrs, transclude) {
        return function postLink(scope, iElement, iAttrs, controller) {
          console.log('Attrs:', iElement, iAttrs, controller);

          // scroll animation
          angular.element('.gal-album-grid').on('scroll load', function(){
            angular.element('.gal-album-grid > *').each( function(i){
              var bottom_of_object = angular.element(this).offset().top + angular.element(this).outerHeight()/8;
              var bottom_of_window = angular.element('.gal-album-grid').scrollTop() + $('gal-album-grid').height();
              if( bottom_of_window > bottom_of_object ){
                angular.element(this).css({'opacity':'1', 'transform': 'translateY(' + 0 + 'em)'});
              } else {
                angular.element(this).css({'opacity':'0', 'transform': 'translateY(' + 2 + 'em)'});
              }
            });
          });

        };
      }

    };
    return defObj;
  }

  function ImgGalleryCtrl($scope, AlbumService, $state, $stateParams,) {
    this.$injector = ['$scope', 'AlbumService'];
    this.$scope = $scope;
    this.$state = $state;
    this.$stateParams = $stateParams;
    $scope.test = 'TEST TEXT';
    this.$scope.items = [];
    this.$scope.directiveId = 'TEST_ID';

    this.$onInit = function () {
      this.loadItems();
    };

    this.loadItems = function () {
      AlbumService.getAlbumItems({
        type: 1,
        limit: 50,
        s: {a_id: $stateParams.aid}
      }).$promise.then(this.loadItemsCb())
        .catch(function (err) {

        });
    };


    this.scorllloadMore = function () {

    };

    var galOpts = {/*mode: 'lg-lollipop', addClass: 'fixed-size', counter: false,
      download: false, startClass: '', enableSwipe: false, enableDrag: false, speed: 500,*/
      thumbnail:true,
      animateThumb: true};

    this.loadItemsCb = function () {
      return function (data) {
        if (data && data.hasOwnProperty('docs')) {
           $scope.items = [];
          $scope.items = data.docs || [];

          setTimeout(function () {
           lightGallery(document.getElementById('gallery_id_0'), galOpts);
           }, 2000);
        }
      };
    }
  }

  angular.module('snoopyApp.blog.private.gallery')
    .controller('ImgGalleryCtrl', ImgGalleryCtrl);
  angular.module('snoopyApp.blog.private.gallery')
    .directive('imgGallery', ImgGallery);
})();
