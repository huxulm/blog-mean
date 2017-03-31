/**
 * Created by xulingming on 2017/3/30.
 */
'use strict';
(function () {
  function ChartService($resource) {
    
    return $resource('/api/static/login', {}, 
      {
        getLoginData: {
          method: 'GET',
          isArray: true
        }
      }
    );
  }
  
  angular.module('snoopyApp.about.chart')
    .factory('ChartService', ChartService);
})();
