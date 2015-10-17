var social = angular.module('social', ['libreHR.directives' , 'ngSanitize', 'ui.bootstrap', 'ngAside']);
social.config(['$httpProvider' , function($httpProvider){
  $httpProvider.defaults.xsrfCookieName = 'csrftoken';
  $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  $httpProvider.defaults.withCredentials = true;
}]);


social.controller('socialCtrl', function($scope , $http, $templateCache, $timeout , userProfileService , $aside) {
  // main business logic starts from here
  $scope.user = userProfileService.get('mySelf');
  console.log(user);
  $scope.user.albums = userProfileService.social('pradeep' , 'albums');
  console.log($scope.user.albums[0].user);
  $scope.user.posts = userProfileService.social('pradeep' , 'posts');
  $scope.user.pictures = userProfileService.social('pradeep' , 'pictures');
  console.log($scope.user.posts);
  $scope.openAside = function(position, backdrop) {
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
      controller: function($scope, $modalInstance) {
        $scope.ok = function(e) {
          $modalInstance.close();
          e.stopPropagation();
        };
        $scope.cancel = function(e) {
          $modalInstance.dismiss();
          e.stopPropagation();
        };
      }
    }).result.then(postClose, postClose);
  }
});
