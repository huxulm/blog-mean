/**
 * Created by xulingming on 2017/2/19.
 */
'use strict';

angular.module('snoopyApp.home')
  .config(function($stateProvider) {
    $stateProvider.state('main.home.editor', {
      url: '/editor',
      templateUrl: 'app/blog/blog_editor/editor.html',
      controller: 'BlogEditorController',
      controllerAs: 'editor'
    });
  });
