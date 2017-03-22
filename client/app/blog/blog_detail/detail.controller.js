/**
 * Created by xulingming on 2017/2/26.
 */
'use strict';
(function () {

  class BlogDetailController {

    constructor($scope, $state, $stateParams, SweetAlert, Blog, marked) {
      this.$scope = $scope;
      this.$state = $state;
      this.$stateParams = $stateParams;
      this.SweetAlert = SweetAlert;
      this.BlogService = Blog;
      this.marked = marked;
    }

    $onInit() {
      this.getBlogDetail(this.blogDetailCallBack());
      this.$scope.blogMarkdown = marked('#TEST');
    };

    showMsg(msg) {
      if (this.SweetAlert) {
        this.SweetAlert.swal('Blog Detail', 'show detail' + (msg || ''), 'success');
      }
    };

    getBlogDetail(cb) {
      this.BlogService.get({id: this.$stateParams.blogId})
        .$promise.then(function (result) {
        cb(result);
      });
    };

    blogDetailCallBack() {
      var $this = this;
      return function (result) {
        // $this.showMsg('Get result:' + JSON.stringify(result));
        $this.$scope.blogDetail = result;
        $this.$scope.html_content = $this.marked($this.$scope.blogDetail.md_content);
      }
    };
  }

  angular.module('snoopyApp.blog.blogDetail')
    .controller('BlogDetailController', BlogDetailController);
})();
