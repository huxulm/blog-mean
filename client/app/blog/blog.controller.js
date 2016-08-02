'use strict';

(function() {

  class BlogController {
    constructor(Blog) {
      // Use the User $resource to fetch all users
      this.Blog = Blog;
      this.lastBlogs = this.Blog.query();
    }

    $onInit() {
      this.lastBlogs = this.Blog.query();
    }
  }



  angular.module('snoopyApp.blog')
    .controller('BlogController', BlogController);
})();