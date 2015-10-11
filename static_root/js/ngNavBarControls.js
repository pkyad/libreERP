var notificationApp = angular.module('notificationApp', ['libreHR.directives',]);

notificationApp.controller('myCtrl', function($scope , $http, $templateCache, $timeout , userProfileService) {
  // main business logic starts from here

  $scope.fetchNotifications = function() {
    console.log("going to fetch notifictions");
    $scope.method = 'GET';
    $scope.url = 'http://localhost:8000/api/notification/';
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
    $scope.url = 'http://localhost:8000/api/chatMessage/';
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
