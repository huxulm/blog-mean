'use strict';

(function() {

  class BlogController {

    constructor(Blog, Util, $window) {
      // Use the User $resource to fetch all users
      this.Blog = Blog;
      this.Util = Util;
      this.currentPage = 1;
      this.pages = 1;
      this.pageSize = 3;
      this.total = 0;
      this.$window = $window;
    }

    $onInit() {
      this.refreshPage(this.rfSuccessCall(this));
    }

    // 前一页
    prePage() {
      console.log('pre page...');
      if (this.currentPage > 0) {
        this.currentPage -= 1;
      }
      this.refreshPage(this.rfSuccessCall(this));
    }

    // 后一页
    nextPage() {
      console.log('next page...');
      if (this.currentPage < this.pages) {
        this.currentPage += 1;
      }
      this.refreshPage(this.rfSuccessCall(this));
    }

    index(idx) {
      if (".." == idx) {
        return;
      }
    }

    refreshPage(callback) {
      this.currentPage = this.currentPage || 1;
      this.pages = this.pages || 0;
      this.pageSize = this.pageSize || 15;
      this.total = this.total || 0;

      console.log("Before refresh page:" + "pageSize:%s,total:%s,pages:%s,currentPage:%s", this.pageSize, this.total, this.pages, this.currentPage);

      // get data
      this.Blog.getPage({page: this.currentPage, limit: this.pageSize})
        .$promise.then(function (result) {
        callback(result);
      });
    }


    rfSuccessCall(a) {

      return function (data) {
        if (data) {
          a.pageSize = data.limit ? Number(data.limit) : 0;
          a.total = data.total ? Number(data.total) : 0;
          a.pages = data.pages ? Number(data.pages) : 0;
          a.currentPage = data.page ? Number(data.page) : 1;
          a.pageResult = data;
          if (data.hasOwnProperty('$promise')) {
            delete data.$promise;
          }
        }
      };
    }

    setPageSize(value) {
      this.pageSize = value;
      this.refreshPage(this.rfSuccessCall(this));
    }

    getIndexArr() {
      var arr = [];
      for (var i = 0; i < 5; i++) {
        arr[i] = (i + 1) + "";
      }
      if (this.pages > 5) {
        arr[arr.length - 2] = "..";
        arr[arr.length - 1] = this.pages + "";
      }
      return arr;
    }

  }



  angular.module('snoopyApp.blog')
    .controller('BlogController', BlogController);
})();
