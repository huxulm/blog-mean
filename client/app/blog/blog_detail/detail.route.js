/**
 * Created by xulingming on 2017/2/26.
 */
angular.module('snoopyApp.blog')
.config(function ($stateProvider) {
  $stateProvider.state('main.blog.detail', {
    url: '/detail/:blogId',
    templateUrl: 'app/blog/blog_detail/detail.html',
    controller: 'BlogDetailController',
    controllerAs: 'detail'
  });
});
