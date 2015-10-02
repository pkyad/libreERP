var notificationApp = angular.module('notificationApp', ['libreHR.directives',]);

notificationApp.controller('myCtrl2', function($scope , $http, $templateCache, $timeout ) {
  // main business logic starts from here

  $scope.fetchNotifications = function() {
    $scope.method = 'GET';
    $scope.url = 'http://localhost:8000/api/notification/';
    $scope.notifications = [];
    $scope.notificationCount =0;
    $http({method: $scope.method, url: $scope.url, cache: $templateCache}).
      then(function(response) {
        $scope.notificationFetchStatus = response.status;
        // console.log(response);
        $scope.notificationCount = response.data.count;
        for (var i = 0; i < response.data.count; i++) {
          var notification = response.data.results[i]
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
        $scope.imsCount = response.data.count;
        for (var i = 0; i < response.data.count; i++) {
          var im = response.data.results[i];
          // console.log(senders.indexOf(im.originator));
          if (senders.indexOf(im.originator) ==-1){
            $scope.ims.push(im);
            senders.push(im.originator);
            $scope.ims[senders.indexOf(im.originator)].count =1;
          } else{
            $scope.ims[senders.indexOf(im.originator)].count +=1;
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

});

function getUser(link){
  var httpRequest = new XMLHttpRequest()
  httpRequest.open('GET', link+"?format=json" , false);
  httpRequest.send(null);
  if (httpRequest.status === 200) { // successfully
    return JSON.parse(httpRequest.responseText); // we're calling our method
  }
}
