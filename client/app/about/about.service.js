/**
 * Created by xulingming on 2017/1/2.
 */
'use strict';
(function () {

    function AboutService($resource) {

        return $resource('/api/users/:userId',
            {userId : '@_id'},
            {
                getAboutInfo : {
                    method : 'GET',
                    isArray : true
                }
            }
        );
    }

    angular.module('snoopyApp.about')
        .factory('About', AboutService);
})();
