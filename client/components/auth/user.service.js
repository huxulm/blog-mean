'use strict';

(function() {

  function UserResource($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    }, {

      // action
      changePassword: {
        method: 'PUT',
        params: {
          controller: 'password'
        }
      },

      // action
      get: {
        method: 'GET',

        // Optional set of pre-bound parameters for this action
        params: {
          id: 'me'
        }
      }
    });
  }

  angular.module('snoopyApp.auth')
    .factory('User', UserResource);
})();
