'use strict';

(function() {

  class BlogController {
    constructor(Blog) {
      // Use the User $resource to fetch all users
      this.Blog = Blog;
      this.lastBlogs = this.Blog.getBlogList();
    };

    $onInit() {
      this.lastBlogs = this.Blog.getBlogList();
      this.pageResult = this.Blog.getPage();
      console.log('page result:' + JSON.stringify(this.pageResult));
    };

    // 前一页
    prePage() {
      console.log('pre page...');
    };

    // 后一页
    nextPage() {
      console.log('next page...');
    };

  }



  angular.module('snoopyApp.blog')
    .controller('BlogController', BlogController);
})();
