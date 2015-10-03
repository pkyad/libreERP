var connection = new autobahn.Connection({url: 'ws://10.140.7.94:8080/ws', realm: 'realm1'});

// "onopen" handler will fire when WAMP session has been established ..
connection.onopen = function (session) {

   console.log("session established!");

   // our event handler we will subscribe on our topic
   //
  function onhello (args) {
    var msg = args[1];
    var status = args[0];
    // console.log(args);
    // console.log("event for 'onhello' received: " + msg + " and the status is " + status);
    var scope = angular.element(document.getElementById('instantMessangerCtrl')).scope();
    scope.$apply(function() {
      // console.log(scope);
      if (status =="T" && !scope.$$childHead.isTyping) {
        scope.$$childHead.isTyping = true;
        setTimeout( function(){
          var scope = angular.element(document.getElementById('instantMessangerCtrl')).scope();
          scope.$apply(function() {
            scope.$$childHead.isTyping = false;
          });
        }, 1500 );
      }

    });

  }
  session.subscribe('com.example.onhello', onhello).then(
    function (sub) {
      console.log("subscribed to topic 'onhello'");
    },
    function (err) {
      console.log("failed to subscribed: " + err);
    }
  );

};

  // fired when connection was lost (or could not be established)
  //
connection.onclose = function (reason, details) {
   console.log("Connection lost: " + reason);
   if (t1) {
      clearInterval(t1);
      t1 = null;
   }
   if (t2) {
      clearInterval(t2);
      t2 = null;
   }
}
connection.open();

var instantMessanger = angular.module('instantMessanger', ['libreHR.directives','ngSanitize']);

instantMessanger.filter('chatWindowMessage' ,['$sce', function($sce){
  return function(data){
    if (true) {
      rendered = '<div class="row">'+
          '<div class="col-md-3">'+
            '<img class="img-responsive img-circle" width="40px" height="50px" alt="P" style="position:relative; top:10px;margin-left:5px;">'+
          '</div>'+
          '<div class="col-md-8 messageBubble">'+ data.message
          '</div>'+
        '</div>';
    }else{
      rendered = '<div class="row">'+
          '<div class="col-md-8 col-md-offset-1 messageBubble">'+
             'ullamco laboris nisi ut aliquip '+
          '</div>'+
          '<div class="col-md-3">'+
            '<img class="img-responsive img-circle" width="40px" height="50px" alt="P" src="{{MEDIA_URL}}/{{user.profile.displayPicture}}" style="position:relative; top:10px;margin-left:5px;">'+
          '</div>'+
        '</div>';
    }
    return $sce.trustAsHtml(rendered);
  }
}]);

instantMessanger.directive('chatWindow', function () {
  return {
    template: '<div class="chatWindow" style="height:{{toggle?500:36}}px">'+
      '<div class="header">'+
        '<div class="container-fluid">'+
          '<i class="fa fa-circle onlineStatus"></i>'+
          '<span class="username">Sandeep Yadav</span>'+
          '<span class="pull-right"><i class="fa fa-chevron-down" ng-click="toggle=!toggle">&nbsp;&nbsp;&nbsp;<i class="fa fa-close"></i></i></span>'+
        '</div>'+
      '</div>'+
      '<div class="messageView container-fluid" ng-show="toggle" id="scrollArea">'+
        '<div ng-repeat="message in ims">'+
          '<div ng-bind-html="message | chatWindowMessage"></div>'+
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
      data : '=',
      common :'=',
    },
    controller : function($scope ,$location,  $anchorScroll, $http, $templateCache, $timeout){
      $scope.isTyping = false;
      $scope.toggle = true;
      $scope.messageToSend = "";
      $scope.status = "N"; // neutral / No action being performed
      $scope.send = function(){
        console.log("going to publish" + $scope.messageToSend);
        msg = angular.copy($scope.messageToSend)
        $scope.status = "M"; // contains message
        connection.session.publish('com.example.onhello', [$scope.status , msg], {}, {acknowledge: true}).then(
          function (publication) {
            // publish was successful
            console.log("success");
          },
          function (error) {
            // publish failed
          }
        );
        $scope.messageToSend = "";
      }; // send function
      $scope.fetchMessages = function() {
        $scope.method = 'GET';
        $scope.url = 'http://localhost:8000/api/chatMessageBetween/?other=raj';
        $scope.ims = [];
        $scope.imsCount = 0;
        var senders = [];
        $http({method: $scope.method, url: $scope.url, cache: $templateCache}).
          then(function(response) {
            $scope.messageFetchStatus = response.status;
            $scope.imsCount = response.data.count;
            for (var i = 0; i < response.data.count; i++) {
              var im = response.data.results[i];
              // console.log(senders.indexOf(im.originator));
              $scope.ims.push(im);
            }
          }, function(response) {
            $scope.messageFetchStatus = response.status;
        });
      };
      $scope.fetchMessages();
    },
    // attrs is the attrs passed from the main scope
    link: function postLink(scope, element, attrs) {
      scope.$watch('messageToSend', function(newValue , oldValue){
        // console.log("changing");
        scope.status = "T"; // the sender is typing a message
        if (newValue!="") {
          connection.session.publish('com.example.onhello', [scope.status , scope.messageToSend]);
        }
        scope.status = "N";
        var $id= $("#scrollArea");
        $id.scrollTop($id[0].scrollHeight);
        scope.$watch('isTyping', function(newValue , oldValue){
          // console.log("scrolling");
          var $id= $("#scrollArea");
          $id.scrollTop($id[0].scrollHeight);
        });
      });
    }
  };
});


instantMessanger.controller('myCtrl', function($scope , $http, $templateCache, $timeout ) {
  // main business logic starts from here
  $scope.test = "Some text";

});
