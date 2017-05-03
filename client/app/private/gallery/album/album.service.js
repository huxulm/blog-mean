/**
 * Created by xulingming on 2017/4/11.
 */
'use strict';
(function () {

  function AlbumService($resource) {
    return $resource('/api/upload/albums/:id',
      {
        id: '@_id'
      },
      {
        getAlbumItem: {
          method: 'POST',
          isArray: false
        },
        getAlbumDirs: {
          method: 'GET',
          isArray: false,
          params: {
            id: 'page',
            type: 0
          }
        },
        getAlbumItems: {
          method: 'GET',
          isArray: false,
          params: {
            id: 'page',
            type: 1
          }
        },
        createAlbum: {
          method: 'POST',
          isArray: false
        }
      }
    );
  }

  angular.module('snoopyApp.blog.private.gallery')
    .factory('AlbumService', AlbumService);
})();
