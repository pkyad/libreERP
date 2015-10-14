var notificationApp = angular.module('notificationApp', ['libreHR.directives',]);

notificationApp.controller('myCtrl', function($scope , $http, $templateCache, $timeout , userProfileService) {
  // main business logic starts from here

  $scope.fetchNotifications = function() {
    console.log("going to fetch notifictions");
    $scope.method = 'GET';
    $scope.url = '/api/notification/';
    $scope.notifications = [];
    $scope.notificationCount =0;
    $http({method: $scope.method, url: $scope.url, cache: $templateCache}).
      then(function(response) {
        $scope.notificationFetchStatus = response.status;
        // console.log(response);
        $scope.notificationCount = response.data.length;
        for (var i = 0; i < response.data.length; i++) {
          var notification = response.data[i]
          $scope.notifications.push(notification)
        }
      }, function(response) {
        $scope.notificationFetchStatus = response.status;
    });
  };
  $scope.usersProfile = [];
  $scope.fetchMessages = function() {
    $scope.method = 'GET';
    $scope.url = '/api/chatMessage/';
    $scope.ims = [];
    $scope.imsCount = 0;
    var senders = [];
    $http({method: $scope.method, url: $scope.url, cache: $templateCache}).
      then(function(response) {
        $scope.messageFetchStatus = response.status;
        $scope.imsCount = response.data.length;
        // console.log(response.data);
        for (var i = 0; i < response.data.length; i++) {
          var im = response.data[i];
          // console.log(senders.indexOf(im.originator));
          if (im.originator != null){
            if (senders.indexOf(im.originator) ==-1){
              $scope.ims.push(im);
              senders.push(im.originator);
              $scope.ims[senders.indexOf(im.originator)].count =1;
            }else{
            $scope.ims[senders.indexOf(im.originator)].count +=1;
            }
          }
          // console.log(senders);
          // console.log($scope.ims);
        }
      }, function(response) {
        $scope.messageFetchStatus = response.status;
    });
  };
  $scope.fetchNotifications();
  $scope.fetchMessages();
  $scope.openChatWindow = function(url){
    // console.log(url);
    // console.log("Will open the chat window");
    var scope = angular.element(document.getElementById('instantMessangerCtrl')).scope();
    // console.log(scope);
    scope.$apply(function() {
      scope.addIMWindow(url);
    });
  }

});



notificationApp.directive('messageStrip', function () {
  return {
    template: '<li class="container-fluid navBarInfoList" ng-click="openChat()">'+
      '<a class="row" style="position: relative; top:-7px; text-decoration:none !important;">'+
        '<img class="img-circle" ng-src="{{data.originator | getDP}}"  alt="My image" style="width:50px;height:50px;position: relative; top:-8px; "/>'+
        '<div class="col-md-10 pull-right" style="position: relative; top:-10px">'+
          '<span class="text-muted">{{data.originator | getName}}</span> {{data.count | decorateCount}}<small style="position:absolute;right:0px;" class="pull-right text-muted">{{data.created | timeAgo}} <i class="fa fa-clock-o "></i></small>'+
          '<br>{{data.message | limitTo:35}}'+
        '</div>'+
      '</a>'+
    '</li>',
    restrict: 'E',
    transclude: true,
    replace:true,
    scope:{
      data : '=',
      openChat :'&',
    },
    controller : function($scope){
    },
    // attrs is the attrs passed from the main scope
    link: function postLink(scope, element, attrs) {

    }
  };
});

notificationApp.directive('notificationStrip', function () {
  return {
    template: '<li class="container-fluid navBarInfoList" >'+
      '<a href="{{data.url}}" class="row" style="position: relative; top:-7px; text-decoration:none !important;">'+
        '<i class="fa {{data.originator | getIcon:this}} fa-2x"></i>'+
        '<div class="col-md-11 pull-right" style="position: relative; top:-10px">'+
          '<span class="text-muted">{{data.originator}}</span><small style="position:absolute;right:0px;" class="pull-right text-muted">{{data.created | timeAgo}} <i class="fa fa-clock-o "></i></small>'+
          '<br>{{data.shortInfo | limitTo:45 }}'+
        '</div>'+
      '</a>'+
    '</li>',
    restrict: 'E',
    transclude: true,
    replace:true,
    scope:{
      data : '=',
    },
    controller : function($scope){
      // console.log($scope.data);
    },
    // attrs is the attrs passed from the main scope
    link: function postLink(scope, element, attrs) {
      
    }
  };
});
