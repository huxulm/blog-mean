/**
 * Created by xulingming on 2017/2/19.
 */
(function () {

  class BlogEditorController {

    constructor($window, $rootScope, $scope, marked, SweetAlert, Blog, Auth) {
      this.$window = $window;
      this.$scope = $scope;
      this.marked = marked;
      this.$rootScope = $rootScope;
      this.SweetAlert = SweetAlert;
      this.BlogService = Blog;
      this.Auth = Auth;
    }

    $onInit() {
      this.$scope.blogEditor = "*This* **is** [markdown](https://xlm.life/)\n and `{{ 1 + 2 }}` = {{ 1 + 2 }}";
      this.$scope.markdownService = marked('#TEST');
    }

    convertMarkdown() {
      vm.convertedMarkdown = marked(vm.markdown);
    }

    /**
     * For some convenience, Angular-Markdown-Editor Directive also save each Markdown Editor inside $rootScope
     * Each of editor object are available through their $rootScope.markdownEditorObjects[editorName]
     *
     * Example: <textarea name="editor1" markdown-editor="{'iconlibrary': 'fa'}"></textarea>
     * We would then call our object through $rootScope.markdownEditorObjects.editor1
     */
    fullScreenPreview() {
      this.$rootScope.markdownEditorObjects.blogEditor.showPreview();
      this.$rootScope.markdownEditorObjects.blogEditor.setFullscreen(true);
    }

    /** Markdown event hook onFullscreen, in this example we will automatically show the result preview when going in full screen
     * the argument (e) is the actual Markdown object returned which help call any of API functions defined in Markdown Editor
     * For a list of API functions take a look on official demo site http://www.codingdrama.com/bootstrap-markdown/
     * @param object e: Markdown Editor object
     */
    onFullScreenCallback = function(e) {
      e.showPreview();
    }

    /** After exiting from full screen, let's go back to editor mode (which mean hide the preview)
     * NOTE: If you want this one to work, you will have to manually download the JS file, not sure why but they haven't released any versions in a while
     *       https://github.com/toopay/bootstrap-markdown/tree/master/js
     */
    onFullScreenExitCallback = function(e) {
      e.hidePreview();
    }

    showMsg(m) {
      console.log('submit...');
      if (this.$window) {
        // this.$window.alert(m);
        this.SweetAlert.swal("marked content:" + (m || ''), "You clicked the button!", "success");
      }
    }

    // submit
    saveBlog() {
      var SweetAlert = this.SweetAlert;
      if (this.$scope.blogEditor) {
        SweetAlert.swal({
            title: "Save your blog?",
            text: "will submit to server",
            type: "info",
            showCancelButton: false,
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
          }, this.saveBlogCallback()
        );
      }
    }

    saveBlogCallback() {
      var $this = this;
      var successCb = function (result) {
        if (result && result.code == -1000) {
          $this.SweetAlert.swal({
            title: "保存失败:" + (result.msg || '')
          });
        }
      };
      var failedCb = function (err) {
        if (err) {
          $this.SweetAlert.swal("failed:" + JSON.stringify(err));
        } else {
          $this.SweetAlert.swal("save success!");
        }
      };
      var user = this.Auth.getCurrentUser();
      return function (isConfirm) {
        if (isConfirm) {
            $this.BlogService.save({md_content: $this.$scope.blogEditor, html_content: $this.marked($this.$scope.blogEditor), author: user.name, author_id: user._id})
              .$promise.then(successCb)
              .then(failedCb);
        }
      };
    }

  }

  angular.module('snoopyApp.home.blogEditor')
    .controller('BlogEditorController', BlogEditorController);

})();
