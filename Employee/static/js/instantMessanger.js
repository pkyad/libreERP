var wampConnection = new autobahn.Connection({url: 'ws://10.140.7.94:8080/ws', realm: 'realm1'});



// "onopen" handler will fire when WAMP session has been established ..


function processIM (args) {
  var msg = args[1];
  var status = args[0];
  var friend = args[2];
  // console.log(args);
  // console.log("event for 'onhello' received: " + msg + " and the status is " + status);
  var scope = angular.element(document.getElementById('chatWindow'+friend)).scope();
  // console.log(scope);
  // console.log();
  scope.$apply(function() {
    // console.log(scope);
    if (status =="T" && !scope.$$childHead.isTyping) {
      scope.$$childHead.isTyping = true;
      // console.log("yes its inside the T");
      // console.log(scope);
      setTimeout( function(){
        var scope = angular.element(document.getElementById('chatWindow'+friend)).scope();
        // console.log(scope);
        scope.$apply(function() {
          scope.$$childHead.isTyping = false;

        });
      }, 1500 );
    }else if (status=="M") {
      // console.log(msg);
      scope.$$childHead.ims.push({message: msg , originator:scope.$$childHead.friendUrl})
      scope.$$childHead.senderIsMe.push(false);
      // may be get the navBar conroller scope and refresh it
    }

  });

}

wampConnection.onopen = function (session) {

  console.log("session established!");

   // our event handler we will subscribe on our topic

  // console.log(wampBindName);
  session.subscribe('service.chat.'+wampBindName, processIM).then(
    function (sub) {
      // console.log(sub);
      // console.log("subscribed to topic 'onhello'");
    },
    function (err) {
      // console.log("failed to subscribed: " + err);
    }
  );
};

console.log(wampConnection);
  // fired when connection was lost (or could not be established)
  //
wampConnection.onclose = function (reason, details) {
   console.log("Connection lost: " + reason);
}
wampConnection.open();

var instantMessanger = angular.module('instantMessanger', ['libreHR.directives','ngSanitize' ]);
instantMessanger.config(['$httpProvider' , function($httpProvider){

  $httpProvider.defaults.xsrfCookieName = 'csrftoken';
  $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  $httpProvider.defaults.withCredentials = true;
}]);

instantMessanger.directive('chatWindow', function (userProfileService) {
  return {
    template: '<div class="chatWindow" style="height:{{toggle?500:36}}px;right:{{location}}px;">'+
      '<div class="header">'+
        '<div class="container-fluid">'+
          '<i class="fa fa-circle onlineStatus"></i>'+
          '<span class="username">{{friend.name}}</span>'+
          '<span class="pull-right"><i class="fa fa-chevron-down" ng-click="toggle=!toggle"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-close" ng-click= "cancel()"></i></span>'+
        '</div>'+
      '</div>'+
      '<div class="messageView container-fluid" ng-show="toggle" id="scrollArea{{pos}}">'+
        '<div ng-repeat="message in ims">'+
          '<div class="row" ng-if="!senderIsMe[$index]">'+
            '<div class="col-md-3">'+
              '<img class="img-responsive img-circle" ng-src="{{message.originator | getDP}}" width="40px" height="50px" alt="P" style="position:relative; top:10px;margin-left:5px;">'+
            '</div>'+
            '<div class="col-md-8 messageBubble"> <p style="word-wrap: break-word;">{{message.message}}</p>'+
            '</div>'+
          '</div>'+
          // for the bubble with sender picture is on the left
          '<div class="row" ng-if="senderIsMe[$index]">'+
            '<div class="col-md-8 col-md-offset-1 messageBubble"> <p style="word-wrap: break-word;"> {{message.message}}</p>'+
            '</div>'+
            '<div class="col-md-3">'+
              '<img class="img-responsive img-circle" ng-src="{{message.originator | getDP}}" width="40px" height="50px" alt="P" style="position:relative; top:10px;margin-left:5px;">'+
            '</div>'+
          '</div>'+
        '</div>'+
        '<div class="row" style="height:40px;">'+
          '<span ng-show="isTyping" style = "padding:10px; id="typingStatus">Typing..</span>'+
        '</div>'+
      '</div>'+
      '<div class="footer" ng-show="toggle">'+
        '<div class="container-fluid">'+
          '<input type="text" class="form-control" name="name" value="" style="width:100%"  ng-enter="send()" ng-model="messageToSend"></input>'+
        '</div>'+
      '</div>'+
    '</div>',
    restrict: 'E',
    transclude: true,
    replace:true,
    scope:{
      friendUrl : '=',
      pos : '=',
      cancel :'&',
    },
    controller : function($scope ,$location,  $anchorScroll, $http, $templateCache, $timeout){
      // console.log($scope.pos);
      $scope.me = userProfileService.get("mySelf");
      $scope.friend = userProfileService.get($scope.friendUrl);
      // console.log($scope.friend);
      $scope.isTyping = false;
      $scope.toggle = true;
      $scope.messageToSend = "";
      $scope.status = "N"; // neutral / No action being performed
      $scope.send = function(){
        console.log("going to publish" + $scope.messageToSend);
        msg = angular.copy($scope.messageToSend)
        if (msg!="") {

          $scope.status = "M"; // contains message
          $scope.ims.push({message: msg , originator: $scope.me.url})
          $scope.senderIsMe.push(true);
          wampConnection.session.publish('service.chat.'+$scope.friend.username, [$scope.status , msg , $scope.me.username], {}, {acknowledge: true}).then(
            function (publication) {
              // console.log("going to post the im");
              dataToSend = {message:msg , user: $scope.friendUrl , read:false};
              // console.log(dataToSend);
              $http({method: 'POST', data:dataToSend, url: 'http://localhost:8000/api/chatMessage/', cache: $templateCache}).
                then(function(response) {
                  // console.log("succesfully sent the im post");
                }, function(response) {
                  // console.log("failed to sent the im post");

              });
            },
            function (error) {
              // publish failed
            }
          );
          $scope.messageToSend = "";
        }
      }; // send function
      $scope.fetchMessages = function() {
        $scope.method = 'GET';
        $scope.url = 'http://localhost:8000/api/chatMessageBetween/?other='+$scope.friend.username;
        $scope.ims = [];
        $scope.imsCount = 0;
        $scope.senderIsMe = [];
        $http({method: $scope.method, url: $scope.url, cache: $templateCache}).
          then(function(response) {
            $scope.messageFetchStatus = response.status;
            $scope.imsCount = response.data.length;
            for (var i = 0; i < response.data.length; i++) {
              var im = response.data[i];
              sender = userProfileService.get(im.originator)
              if (sender.name == $scope.me.name) {
                $scope.senderIsMe.push(true);
              }else {
                $scope.senderIsMe.push(false);
              }
              $scope.ims.push(im);
              // update the message as read
              // var fd = new FormData();
              // fd.append('read' , true);
              // $http({method: 'POST', data:fd ,transformRequest: angular.identity, url: im.url}).
              //   then(
              //     function(response) {
              //
              //     },
              //     function(response) {
              //     $scope.messageFetchStatus = response.status;
              //   });
            }
          }, function(response) {
            $scope.messageFetchStatus = response.status;
        });
      };
      $scope.fetchMessages();
      $scope.scroll = function(){
        var $id= $("#scrollArea"+$scope.pos);
        $id.scrollTop($id[0].scrollHeight);
      }
    },
    // attrs is the attrs passed from the main scope
    link: function postLink(scope, element, attrs) {
      scope.$watch('messageToSend', function(newValue , oldValue ){
        // console.log("changing");
        scope.status = "T"; // the sender is typing a message
        if (newValue!="") {
          wampConnection.session.publish('service.chat.'+scope.friend.username, [scope.status , scope.messageToSend , scope.me.username]);
        }
        scope.status = "N";
      }); // watch for the messageTosend
      scope.$watch('ims.length', function( ){
        setTimeout( function(){
          scope.scroll();
        }, 500 );
      });
      scope.$watch('pos', function( newValue , oldValue){
        // console.log(newValue);
        scope.location = 30+newValue*320;
        // console.log("setting the new position value");
        // console.log();
      });
    } // link
  };
});


instantMessanger.controller('myCtrl', function($scope , $http, $templateCache, $timeout , userProfileService) {
  // main business logic starts from here
  // $scope.test = "Some text";
  // $scope.url = "http://localhost:8000/api/users/3/";

  $scope.imWindows = [ ];

  $scope.addIMWindow = function(url){
    // add a chat window
    // console.log(url);
    if ($scope.imWindows.length<=4) {
      for (var i = 0; i < $scope.imWindows.length; i++) {
        if ($scope.imWindows[i].url == url) {
          // console.log("already open");
          return;
        }
      }
      me = userProfileService.get("mySelf");
      if (url != me.url) {
        friend = userProfileService.get(url)
        $scope.imWindows.push({url:url , username : friend.username});
        // console.log($scope.imWindows);
      }
    }
  }
  $scope.closeIMWindow = function(pos){
    // closes the chat window
    // console.log("came in the close Im window function");
    $scope.imWindows.splice(pos, 1);
    // console.log($scope.imWindows);
  }
});
