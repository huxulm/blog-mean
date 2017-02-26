'use strict';

(function() {

  function authInterceptor($rootScope, $q, $cookies, $injector, Util, SweetAlert) {
    var state;
    return {
      // Add authorization token to headers
      request(config) {
        config.headers = config.headers || {};
        if ($cookies.get('token') && Util.isSameOrigin(config.url)) {
          config.headers.Authorization = 'Bearer ' + $cookies.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError(response) {
        if (response.status === 401) {
          SweetAlert.swal({
            title: 'Haven\'t login in, now to login?',
          }, function (isConfirm) {
            if (isConfirm) {
              (state || (state = $injector.get('$state')))
                .go('login');
            }
          });
          // remove any stale tokens
          $cookies.remove('token');
        }
        return $q.reject(response);
      }
    };
  }

  angular.module('snoopyApp.auth')
    .factory('authInterceptor', authInterceptor);
})();
