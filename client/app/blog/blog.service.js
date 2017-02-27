'use strict';

(function () {
    function BlogService($resource) {
        /*return {
            getBlogList: function () {
                return [
                    {
                        title: "Blog titile example1",
                        author: "Jackdon",
                        content: "A blog is your best bet for a voice among the online crowd. It's a personal website, packed with features, as easy to use as your e-mail.",
                        time: "2016-5-27 01:20:03"
                    },
                    {
                        title: "Blog titile example2",
                        author: "Washdon",
                        content: "Our community is the choice for more than two million bloggers. Join the fray as we observe the world.",
                        time: "2016-5-27 01:20:03"
                    },
                    {
                        title: "Blog titile example3",
                        author: "Funckdon",
                        content: "Fully-featured from the get-go, Blog.com provides a powerful publishing platform for free.",
                        time: "2016-5-27 01:20:03"
                    }
                ];
            }
        }*/
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
