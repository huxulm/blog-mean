'use strict';

(function () {
    function BlogService($resource) {

        return $resource('/api/blogs/:id/:controller',
            {id: '@_id'},
            {
              getBlogList: {
                    method: 'GET',
                    isArray: true
                },
              getPage: {
                method: 'GET',
                isArray: false,
                params: {
                  id: 'page'
                }
              },
              getTags: {
                method: 'GET',
                isArray: false,
                params: {
                  id: 'tags'
                }
              }
            }
        );

    }

    angular.module('snoopyApp.blog').factory('Blog', BlogService);
})();
