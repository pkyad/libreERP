var social = angular.module('social', ['libreHR.directives' , 'ngSanitize', 'ui.bootstrap', 'ngAside']);
social.config(['$httpProvider' , function($httpProvider){
  $httpProvider.defaults.xsrfCookieName = 'csrftoken';
  $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  $httpProvider.defaults.withCredentials = true;
}]);


social.controller('socialCtrl', function($scope , $http, $templateCache, $timeout , userProfileService , $aside) {
  // main business logic starts from here
  $scope.user = userProfileService.get('mySelf');
  $scope.user.albums = userProfileService.social('pradeep' , 'albums');
  $scope.user.posts = userProfileService.social('pradeep' , 'posts');
  $scope.user.pictures = userProfileService.social('pradeep' , 'pictures');
  console.log($scope.user.posts);
  // console.log("albums now");
  // console.log();
  // console.log("pictures now");
  // console.log(userProfileService.social('pradeep' , 'pictures'));
  // console.log("end of the social controller");
});
