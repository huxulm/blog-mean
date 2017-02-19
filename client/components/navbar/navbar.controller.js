'use strict';

class NavbarController {
  //end-non-standard

  //start-non-standard
  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
    this.menu = [
      {
        state: 'main.home',
        title: 'Home'
      },
      {
        state: 'main.blog',
        title: 'Blog'
      },
      {
        state: 'main.about',
        title: 'About'
      }
    ];
  }

}

angular.module('snoopyApp')
  .controller('NavbarController', NavbarController);
