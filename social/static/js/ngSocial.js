var social = angular.module('social', ['libreHR.directives' , 'ngSanitize', 'ui.bootstrap', 'ngAside']);
social.config(['$httpProvider' , function($httpProvider){
  $httpProvider.defaults.xsrfCookieName = 'csrftoken';
  $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  $httpProvider.defaults.withCredentials = true;
}]);

social.directive('messageBubble', function () {
  return {
    templateUrl:'/static/ngTemplates/messageBubble.html',
    restrict: 'E',
    transclude: true,
    replace:true,
    scope:{
      data : '=',
    },
    controller : function($scope, $http , userProfileService){
      $scope.me = userProfileService.get("mySelf");
      $scope.liked = false;
      for (var i = 0; i < $scope.data.likes.length; i++) {
        if ($scope.data.likes[i].user.split('?')[0] == $scope.me.url) {
          $scope.liked = true;
          break;
        }
      }
      $scope.likeComment = function(){
        if ($scope.liked) {
          return;
        }
        $http({method : 'PATCH' , data : {some: "text"} , url : $scope.data.url }).
        then(function(response){
          // console.log(response);
          $scope.data.likes.push(response.data)
          $scope.liked = true;
        }, function(response){

        });
      }
    },
  };
});

social.directive('post', function () {
  return {
    template:'<li><i class="fa fa-commenting-o bg-blue"></i>'+
    '<div class="timeline-item">'+
      '<span class="time"><i class="fa fa-clock-o"></i> {{data.created | timeAgo}} ago</span>'+
      '<h3 class="timeline-header"><a href=""><img ng-src="{{data.user | getDP}}" height="40px" width="40px"/> </a> {{data.user | getName}}</h3>'+
      '<div class="timeline-body">'+
        '{{data.text}}'+
      '</div>'+
      '<div class="timeline-footer" >'+
        '<a style="text-decoration: none;" href="" >{{data.likes.length==0? '+"''"+':data.likes.length}} Likes <i class="fa fa-thumbs-o-up"></i></a> <a href="" ng-click="openPost('+"'right'"+', true , data)">{{data.comments.length==0? '+"''"+':data.comments.length}} Comments <i class="fa fa-comment-o"></i></a>'+
      '</div>'+
    '</div></li>',
    restrict: 'E',
    transclude: true,
    replace:true,
    scope:{
      data : '=',
    },
    controller : function($scope, $http , $timeout , userProfileService , $aside , $interval , $window) {
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
            // console.log($scope);
            $scope.data = data;
            $scope.possibleCommentHeight = 70;
            $scope.textToComment = "";
            $scope.viewMode = 'comments';
            $scope.liked = false;
            for (var i = 0; i < $scope.data.likes.length; i++) {
              if ($scope.data.likes[i].user.split('?')[0] == $scope.me.url) {
                $scope.liked = true;
                break;
              }
            }

            setTimeout(function () {
              postBodyHeight = $("#postModalBody").height();
              inputHeight = $("#commentInput").height();
              winHeight = $(window).height();
              defaultHeight = postBodyHeight + 5.7*inputHeight;
              $scope.commentsHeight = Math.floor(100*(winHeight - defaultHeight)/winHeight);
              $scope.$apply();
              scroll();
            }, 100);
            $scope.comment = function(){
              dataToSend = {text: $scope.textToComment , parent: $scope.data.url.split('?')[0] , user: $scope.data.user };
              // although the api will set the user to the sender of the request a valid user url is needed for the request otherwise 400 error will be trown
              $http({method: 'POST', data:dataToSend, url: '/api/socialPostComment/'}).
                then(function(response) {
                  $scope.data.comments.push(response.data)
                  $scope.textToComment = "";
                  $scope.viewMode = 'comments';
                  setTimeout(function () {
                    scroll();
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
              $http({method: 'POST', data:dataToSend, url: '/api/socialPostLike/'}).
                then(function(response) {
                  $scope.textToComment = "";
                  console.log("liked");
                  $scope.liked = true;
                  $scope.data.likes.push(response.data)
                }, function(response) {
                  // console.log("failed to sent the comment");

              });
            }
          }
        }).result.then(postClose, postClose);
      }

    },
  };
});

social.directive('album', function () {
  return {
    template:'<li>'+
        '<i class="fa fa-camera bg-purple"></i>'+
        '<div class="timeline-item">'+
          '<span class="time"><i class="fa fa-clock-o"></i> {{data.created | timeAgo}} ago</span>'+
          '<h3 class="timeline-header"><a href="#">{{data.user | getName}}</a> uploaded new photos to album : {{data.title}}</h3>'+
          '<div class="timeline-body">'+
            '<div ng-repeat = "picture in data.photos" style="display: inline;">'+
              '<img ng-click="openAlbum('+"'right'"+ ', true , picture)" ng-src="{{picture.photo}}" alt="..." class="margin" height="100px" width="150px" >'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</li>',
    restrict: 'E',
    transclude: true,
    replace:true,
    scope:{
      data : '=',
    },
    controller : function($scope, $http , $timeout , userProfileService , $aside , $interval , $window) {
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
            $scope.viewMode = 'comments';
            $scope.liked = false;
            for (var i = 0; i < $scope.data.likes.length; i++) {
              if ($scope.data.likes[i].user.split('?')[0] == $scope.me.url) {
                $scope.liked = true;
                break;
              }
            }
            setTimeout(function () {
              postBodyHeight = $("#postModalBody").height();
              inputHeight = $("#commentInput").height();
              winHeight = $(window).height();
              defaultHeight = postBodyHeight + 6*inputHeight;
              $scope.commentsHeight = Math.floor(100*(winHeight - defaultHeight)/winHeight);
              $scope.$apply();
              scroll();
            }, 100);
            $scope.comment = function(){
              dataToSend = {text: $scope.textToComment , parent: $scope.data.url.split('?')[0] , user: $scope.data.user };
              // although the api will set the user to the sender of the request a valid user url is needed for the request otherwise 400 error will be trown
              $http({method: 'POST', data:dataToSend, url: '/api/socialPictureComment/'}).
                then(function(response) {
                  $scope.data.comments.push(response.data)
                  $scope.textToComment = "";
                  $scope.viewMode = 'comments';
                  setTimeout(function () {
                    scroll();
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
              $http({method: 'POST', data:dataToSend, url: '/api/socialPictureLike/'}).
                then(function(response) {
                  $scope.textToComment = "";
                  // console.log("liked");
                  $scope.liked = true;
                  $scope.data.likes.push(response.data)
                }, function(response) {
                  // console.log("failed to sent the comment");

              });
            }
          }
        }).result.then(postClose, postClose);
      }
    },
  };
});

social.controller('socialCtrl', function($scope , $http , $timeout , userProfileService , $aside , $interval , $window) {
  $scope.user = userProfileService.get("http://localhost:8000/api/users/2/");
  $scope.user.albums = userProfileService.social(user.username , 'albums');
  $scope.user.posts = userProfileService.social(user.username , 'post');
  $scope.user.pictures = userProfileService.social(user.username , 'pictures');
  $scope.me = userProfileService.get('mySelf');
  $scope.statusMessage = '';
  $scope.picturePost = {photo : {}};
  $scope.post = {attachment : {} , text : ''};
  $scope.publishPost = function(){
    var fd = new FormData();
    fd.append('attachment', $scope.post.attachment);
    obj = new Object();
    console.log($scope.post.attachment == obj);
    if ($scope.post.attachment == new Object()) {
      console.log("Yes");
    }
    fd.append('text' , $scope.post.text );
    fd.append('user' , $scope.me.url);
    var uploadUrl = "/api/socialPost/";
    $http({method : 'POST' , url : uploadUrl, data : fd , transformRequest: angular.identity, headers: {'Content-Type': undefined}}).
    then(function(response){
      $scope.post = {attachment : {} , text: ''};
      $scope.statusMessage = "Posted";
      $scope.status = 'success';
      console.log($scope.user.url);
      console.log($scope.me.url);
      if ($scope.user.url == $scope.me.url) {
        console.log("pushed");
        $scope.user.posts.push(response.data);
      }
    },function(response){
      $scope.status = 'danger';
      $scope.statusMessage = 'Failed';
    });
  };
  $scope.uploadImage = function(){
    var fd = new FormData();
    fd.append('photo', $scope.picturePost.photo);
    fd.append('tagged' , '');
    fd.append('user' , $scope.me.url);
    var uploadUrl = "/api/socialPicture/";
    $http({method : 'POST' , url : uploadUrl, data : fd , transformRequest: angular.identity, headers: {'Content-Type': undefined}}).
    then(function(response){
      $scope.picturePost = {photo : {}};
      $scope.statusMessage = "Uploaded";
      if ($scope.user.url == $scope.me.url) {
        $scope.user.pictures.push(response.data);
        $scope.status = 'success';
      }
    },function(response){
      $scope.status = 'danger';
      $scope.statusMessage = 'Failed';
    });
  };



});

scroll = function(){
  var $id= $("#commentsArea");
  $id.scrollTop($id[0].scrollHeight);
}
