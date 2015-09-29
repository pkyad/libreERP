var ngNavBarControls = angular.module('ngNavBarControls', ['libreHR.directives',]);

ngNavBarControls.config(['$httpProvider' , function($httpProvider){
  $httpProvider.defaults.xsrfCookieName = 'csrftoken';
  $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  $httpProvider.defaults.withCredentials = true;
}])

ngNavBarControls.controller('myCtrl', function($scope , $http , ngHttpSocket) {
  // main business logic starts from here

  $scope.name = "pradeep";











});
