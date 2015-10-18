var social = angular.module('social', ['libreHR.directives' , 'ngSanitize', 'ui.bootstrap', 'ngAside']);
social.config(['$httpProvider' , function($httpProvider){
  $httpProvider.defaults.xsrfCookieName = 'csrftoken';
  $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  $httpProvider.defaults.withCredentials = true;
}]);


social.controller('socialCtrl', function($scope , $http , $timeout , userProfileService , $aside , $interval , $window) {
  // main business logic starts from here
  $scope.user = userProfileService.get("http://localhost:8000/api/users/2/");
  $scope.user.albums = userProfileService.social(user.username , 'albums');

  // console.log(user);
  // console.log($scope.user.albums[0].user);
  $scope.user.posts = userProfileService.social(user.username , 'posts');
  $scope.user.pictures = userProfileService.social(user.username , 'pictures');
  // console.log($scope.user.posts);
  $scope.openPost = function(position, backdrop , data) {
    $scope.asideState = {
      open: true,
      position: position
    };

    function postClose() {
      $scope.asideState.open = false;
    }

    $aside.open({
      templateUrl: '/static/ngTemplates/post.html',
      placement: position,
      size: 'md',
      backdrop: backdrop,
      controller: function($scope, $modalInstance ) {
        $scope.me = userProfileService.get("mySelf");
        console.log($scope);
        $scope.data = data;
        $scope.possibleCommentHeight = 70;
        $scope.textToComment = "";
        $scope.commentsCount = $scope.data.comments.length;
        $scope.likesCount = $scope.data.likes.length;
        $scope.viewMode = 'comments';
        $scope.liked = false;
        for (var i = 0; i < $scope.likesCount; i++) {
          if ($scope.data.likes[i].user.split('?')[0] == $scope.me.url) {
            $scope.liked = true;
            // console.log("liked");
            break;
          }
        }
        $scope.scroll = function(){
          var $id= $("#postCommentsArea");
          $id.scrollTop($id[0].scrollHeight);
        }

        setTimeout(function () {
          postBodyHeight = $("#postModalBody").height();
          inputHeight = $("#commentInput").height();
          winHeight = $(window).height();
          console.log(inputHeight);
          defaultHeight = postBodyHeight + 5.7*inputHeight;
          $scope.commentsHeight = Math.floor(100*(winHeight - defaultHeight)/winHeight);
          $scope.$apply();
          $scope.scroll();
        }, 100);
        $scope.comment = function(){
          dataToSend = {text: $scope.textToComment , parent: $scope.data.url.split('?')[0] , user: $scope.data.user };
          // although the api will set the user to the sender of the request a valid user url is needed for the request otherwise 400 error will be trown
          $http({method: 'POST', data:dataToSend, url: '/api/socialPostComments/'}).
            then(function(response) {
              $scope.data.comments.push({user:$scope.me.url , text : $scope.textToComment , url : '' , created : new Date()})
              $scope.textToComment = "";
              setTimeout(function () {
                $scope.scroll();
              }, 100);
            }, function(response) {
              // console.log("failed to sent the comment");

          });
        }

        $scope.like = function(){
          if ($scope.liked) {
            return;
          }
          dataToSend = {parent: $scope.data.url.split('?')[0] , user: $scope.data.user};
          // although the api will set the user to the sender of the request a valid user url is needed for the request otherwise 400 error will be trown
          $http({method: 'POST', data:dataToSend, url: '/api/socialPostLikes/'}).
            then(function(response) {
              $scope.textToComment = "";
              console.log("liked");
              $scope.liked = true;
              $scope.likesCount +=1;
              $scope.data.likes.push({url: '' , user : $scope.me.url , created : new Date()})
            }, function(response) {
              // console.log("failed to sent the comment");

          });
        }
      }
    }).result.then(postClose, postClose);
  }

  $scope.openAlbum = function(position, backdrop , data) {
    $scope.asideState = {
      open: true,
      position: position
    };

    function postClose() {
      $scope.asideState.open = false;
    }

    $aside.open({
      templateUrl: '/static/ngTemplates/album.html',
      placement: position,
      size: 'lg',
      backdrop: backdrop,
      controller: function($scope, $modalInstance ) {
        $scope.me = userProfileService.get("mySelf");
        $scope.data = data;
        $scope.possibleCommentHeight = 70;
        $scope.textToComment = "";
        $scope.commentsCount = $scope.data.comments.length;
        $scope.likesCount = $scope.data.likes.length;
        $scope.viewMode = 'comments';
        $scope.liked = false;
        for (var i = 0; i < $scope.likesCount; i++) {
          if ($scope.data.likes[i].user.split('?')[0] == $scope.me.url) {
            $scope.liked = true;
            // console.log("liked");
            break;
          }
        }
        $scope.scroll = function(){
          var $id= $("#postCommentsArea");
          $id.scrollTop($id[0].scrollHeight);
        }

        setTimeout(function () {
          postBodyHeight = $("#postModalBody").height();
          inputHeight = $("#commentInput").height();
          winHeight = $(window).height();
          console.log(inputHeight);
          defaultHeight = postBodyHeight + 5.7*inputHeight;
          $scope.commentsHeight = Math.floor(100*(winHeight - defaultHeight)/winHeight);
          $scope.$apply();
          $scope.scroll();
        }, 100);
        $scope.comment = function(){
          dataToSend = {text: $scope.textToComment , parent: $scope.data.url.split('?')[0] , user: $scope.data.user };
          // although the api will set the user to the sender of the request a valid user url is needed for the request otherwise 400 error will be trown
          $http({method: 'POST', data:dataToSend, url: '/api/socialPostComments/'}).
            then(function(response) {
              $scope.data.comments.push({user:$scope.me.url , text : $scope.textToComment , url : '' , created : new Date()})
              $scope.textToComment = "";
              setTimeout(function () {
                $scope.scroll();
              }, 100);
            }, function(response) {
              // console.log("failed to sent the comment");

          });
        }

        $scope.like = function(){
          if ($scope.liked) {
            return;
          }
          dataToSend = {parent: $scope.data.url.split('?')[0] , user: $scope.data.user};
          // although the api will set the user to the sender of the request a valid user url is needed for the request otherwise 400 error will be trown
          $http({method: 'POST', data:dataToSend, url: '/api/socialPostLikes/'}).
            then(function(response) {
              $scope.textToComment = "";
              console.log("liked");
              $scope.liked = true;
              $scope.likesCount +=1;
              $scope.data.likes.push({url: '' , user : $scope.me.url , created : new Date()})
            }, function(response) {
              // console.log("failed to sent the comment");

          });
        }
      }
    }).result.then(postClose, postClose);
  }

});
