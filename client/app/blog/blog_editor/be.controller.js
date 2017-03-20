/**
 * Created by xulingming on 2017/2/19.
 */
(function () {

  class BlogEditorController {

    constructor($window, $rootScope, $scope, marked, SweetAlert, Blog, Auth, $mdDialog) {
      this.$window = $window;
      this.$scope = $scope;
      this.marked = marked;
      this.$rootScope = $rootScope;
      this.SweetAlert = SweetAlert;
      this.BlogService = Blog;
      this.Auth = Auth;
      this.$mdDialog = $mdDialog;
    }

    $onInit() {
      this.$scope.blogEditor = "*This* **is** [markdown](https://xlm.life/)\n and `{{ 1 + 2 }}` = {{ 1 + 2 }}";
      this.$scope.markdownService = marked('#TEST');

      this.$scope.blog = {title: "New Blog Title"};
      this.$scope.default = {};
      this.$scope.default.readonly = false;
      this.$scope.default.tags = [];
      this.$scope.default.removable = true;

      this.$scope.avaliableTags =[];
      this.BlogService.getTags().$promise
        .then(this.tagCb());
      this.resetUI();
    }

    tagCb() {
      var $this = this;
      return function (d) {
        $this.$scope.avaliableTags = d.docs;
        $this.refreshTags();
      };
    }

    refreshTags() {
      var $this = this;
      if ($this.$scope.avaliableTags.length > 0) {
        $this.$scope.default.tags = [];
        $this.$scope.avaliableTags.forEach(function (e) {
          if (e) {
            $this.$scope.default.tags.push(e);
          }
        });
      }
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

    /*showMsg(m) {
      console.log('submit...');
      if (this.$window) {
        // this.$window.alert(m);
        this.SweetAlert.swal("marked content:" + (m || ''), "You clicked the button!", "success");
      }
    }*/

    // submit
    saveBlog(ev) {
      var SweetAlert = this.SweetAlert;
      if (this.$scope.blogEditor) {
        this.showMsg("will submit to server", {
            title: "Save your blog?",
            type: "info",
            showCancelButton: true,
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
          $this.showMsg(null, {
            title: "保存失败:" + (result.msg || '')
          }, () =>{});
        }
      };
      var failedCb = function (err) {
        if (err) {
          $this.showMsg("failed:" + JSON.stringify(err), null);
        } else {
          $this.showMsg("save success!", null);
        }
      };
      return function (isConfirm) {
        if (isConfirm) {
          var post = $this.buildBlogPost();
          if (!$this.checkPost(post)) {
            return;
          }
          $this.BlogService.save(post)
            .$promise.then(successCb)
            .then(failedCb);
        }
      };
    }

    buildBlogPost() {
      // current login user
      var user = this.Auth.getCurrentUser();
      var tag_ids = [];
      var $this = this;
      this.$scope.default.tags.forEach(function (e) {
        $this.$scope.avaliableTags.forEach(function (tag) {
          if (tag.tag === e) {
            tag_ids.push({tag_id: tag._id || null});
          }
        });
      });
      return {
        md_content: this.$scope.blogEditor,
        html_content: this.marked(this.$scope.blogEditor),
        author: user.name,
        author_id: user._id,
        tags: tag_ids,
        title: this.$scope.blog.title
      }
    }

    checkPost(d) {
      var flag = true;
      var msg = [];
      if (!d) {
        msg.push(JSON.stringify(msg || ""));
      } else if (!d.title) {
        msg.push("Haven't add a title!");
      } else if (d.title.length < 6) {
        msg.push("Title must has more than 6 chars");
      } else if (!d.md_content) {
        msg.push("Haven't add content!");
      } else if (d.md_content.length < 50) {
        msg.push("Content must has more than 50 chars");
      } else if (!d.author_id) {
        msg.push("Haven't login?");
      }
      if (msg.length > 0) {
        flag = false;
        this.showMsg( JSON.stringify(msg || ""), {
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: "OK",
          // confirmButtonColor: "#FF0000",
          type: "warning",
          title: "Error:"
        }, () => {});
      }
      return flag;
    }

    resetUI() {
      this.$scope.blogSubmitStyle = {
        "height" : "36px",
        "float" : "right"
      };

      this.$scope.uploadImageCallback = this.uploadImageCall;
    }

    uploadImageCall(e) {
      swal('upload image...');
    }

    showMsg(msg, config, cb) {
      if (!config || !(typeof config === 'object')) {
        config = {};
      }
      if (msg) {
        config.text = msg;
        config.title = msg.replace(/\[/, "");
      }
      this.SweetAlert.swal(config, cb || (()=>{}));
    }

  }

  angular.module('snoopyApp.home.blogEditor')
    .controller('BlogEditorController', BlogEditorController);

})();
