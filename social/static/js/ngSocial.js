var social = angular.module('social', ['libreHR.directives' , 'ngSanitize', 'ui.bootstrap', 'ngAside' , 'ngDraggable']);
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
    templateUrl: '/static/ngTemplates/postBubble.html',
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

  $scope.droppedObjects = [];
  $scope.onDropComplete=function(data,evt){
    var index = $scope.droppedObjects.indexOf(data);
    if (index == -1){
      $scope.droppedObjects.push(data);
      var index = $scope.draggableObjects.indexOf(data);
      $scope.draggableObjects.splice(index , 1);
    }
  }

  $scope.itemsNumPerView = [5, 10, 20];
  $scope.itemsPerView = 5;
  $scope.pageList = [1];
  $scope.pageNo = 1; // default page number set to 0

  $scope.removeFromTempAlbum = function(index){
    pic = $scope.droppedObjects[index];
    $scope.droppedObjects.splice(index , 1);
    $scope.draggableObjects.push(pic);
  }
  $scope.tempAlbum = {title : '' , photos : []};
  $scope.createAlbum = function(){
    if ($scope.droppedObjects.length == 0) {
      $scope.status = 'danger';
      $scope.statusMessage = 'No photo selected';
      setTimeout(function () {
        $scope.statusMessage = '';
        $scope.status = '';
        $scope.$apply();
      }, 4000);
      return;
    }
    for (var i = 0; i < $scope.droppedObjects.length; i++) {
      uri = $scope.droppedObjects[i].url.split('/?')[0];
      // nested request is not supported by the django rest framework so sending the PKs of the photos to the create function in the serializer
      pk = uri.split('socialPicture/')[1];
      $scope.tempAlbum.photos.push(pk);
    }
    dataToPost = {
      user : $scope.me.url,
      title : $scope.tempAlbum.title,
      photos : $scope.tempAlbum.photos,
    };
    // console.log(dataToPost);
    $http({method: 'POST' , data : dataToPost , url : '/api/socialAlbum/'}).
    then(function(response){
      $scope.tempAlbum = {title : '' , photos: []};
      $scope.droppedObjects = [];
      $scope.statusMessage = "Posted";
      $scope.status = 'success';
      if ($scope.user.url == $scope.me.url) {
        $scope.user.albums.push(response.data);
      }
      setTimeout(function () {
        $scope.statusMessage = '';
        $scope.status = '';
        $scope.$apply();
      }, 4000);
    },function(response){
      $scope.status = 'danger';
      $scope.statusMessage = response.status + ' : ' + response.statusText;
      setTimeout(function () {
        $scope.statusMessage = '';
        $scope.status = '';
        $scope.$apply();
      }, 4000);
    });
  }


  $scope.user = userProfileService.get("http://localhost:8000/api/users/2/");
  $scope.user.albums = userProfileService.social(user.username , 'albums');
  $scope.user.posts = userProfileService.social(user.username , 'post');
  $scope.user.pictures = userProfileService.social(user.username , 'pictures');
  $scope.me = userProfileService.get('mySelf');
  $scope.statusMessage = '';
  $scope.picturePost = {photo : {}};
  $scope.post = {attachment : {} , text : ''};

  $http({method: 'GET' , url : '/api/socialPicture/?albumEditor&user='+$scope.user.username}).
  then(function(response){
    $scope.draggableObjects = response.data
  } , function(response){
    console.log("error getting the pictures");
  });



  var f = new File([""], "");
  $scope.post = {attachment : f , text: ''};
  $scope.publishPost = function(){
    var fd = new FormData();
    fd.append('attachment', $scope.post.attachment);
    fd.append('text' , $scope.post.text );
    fd.append('user' , $scope.me.url);
    var uploadUrl = "/api/socialPost/";
    $http({method : 'POST' , url : uploadUrl, data : fd , transformRequest: angular.identity, headers: {'Content-Type': undefined}}).
    then(function(response){
      $scope.post = {attachment : f , text: ''};
      $scope.statusMessage = "Posted";
      $scope.status = 'success';
      if ($scope.user.url == $scope.me.url) {
        $scope.user.posts.push(response.data);
      }
      setTimeout(function () {
        $scope.statusMessage = '';
        $scope.status = '';
        $scope.$apply();
      }, 4000);
    },function(response){
      $scope.status = 'danger';
      $scope.statusMessage = response.status + ' : ' + response.statusText;
      setTimeout(function () {
        $scope.statusMessage = '';
        $scope.status = '';
        $scope.$apply();
      }, 4000);
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
      setTimeout(function () {
        $scope.statusMessage = '';
        $scope.status = '';
        $scope.$apply();
      }, 4000);

    },function(response){
      $scope.status = 'danger';
      $scope.statusMessage = response.status + ' : ' +  response.statusText;
      setTimeout(function () {
        $scope.statusMessage = '';
        $scope.status = '';
        $scope.$apply();
      }, 4000);
    });
  };
});

scroll = function(){
  var $id= $("#commentsArea");
  $id.scrollTop($id[0].scrollHeight);
}
