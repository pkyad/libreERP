var social = angular.module('social', ['libreHR.directives' , 'ngSanitize', 'ui.bootstrap', 'ngAside']);
social.config(['$httpProvider' , function($httpProvider){
  $httpProvider.defaults.xsrfCookieName = 'csrftoken';
  $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  $httpProvider.defaults.withCredentials = true;
}]);

social.controller('socialCtrl', function($scope , $http, $templateCache, $timeout , userProfileService , $aside) {
  // main business logic starts from here
  $scope.user = userProfileService.get('mySelf');
  $scope.test = 'hello';

  $scope.fetchPost = function(user){
    fetch.url = '/api/socialPost/';
    if (typeof user != 'undefined') {
      fetch.url += '?user='+user;
    }
    fetch.method = 'GET';
    $http({method: fetch.method, url: fetch.url, cache: $templateCache}).
      then(function(response) {
        $scope.posts = response.data;
        console.log($scope.posts);
      }, function(response) {

    });
  }
  $scope.fetchAlbum = function(user){
    fetch.url = '/api/socialAlbum/';
    if (typeof user != 'undefined') {
      fetch.url += '?user='+user;
    }
    fetch.method = 'GET';
    $http({method: fetch.method, url: fetch.url, cache: $templateCache}).
      then(function(response) {
        $scope.album = response.data;
        console.log($scope.album);
      }, function(response) {

    });
  }



  $scope.fetchPost()
  $scope.fetchAlbum()

});
