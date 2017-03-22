/**
 * Created by xulingming on 2017/1/2.
 */
'use strict';

(function () {
    class AboutController {

        constructor(About) {
            this.About = About;
        }

        $onInit() {
          var info = this.About.getAboutInfo();
          console.log('-------->' + JSON.stringify(info));
        }
    }

    angular.module('snoopyApp.about')
        .controller('AboutController', AboutController);
})();
