var genericSearch = angular.module('genericSearch', ['libreHR.directives' , 'ngSanitize', 'ui.bootstrap', 'ngAside' , 'genericSearchTable']);

console.log("file loaded");

genericSearch.config(['$httpProvider' , function($httpProvider){
  $httpProvider.defaults.xsrfCookieName = 'csrftoken';
  $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  $httpProvider.defaults.withCredentials = true;
}]);

genericSearch.controller('empSearchCtrl', function($scope , $http, $templateCache, $timeout , userProfileService , $aside) {

  $scope.views = [{name : 'table' , icon : 'fa-bars' , template : '/static/ngTemplates/tableDefault.html'},
      {name : 'thumbnail' , icon : 'fa-th-large' , template : '/static/ngTemplates/tableThumbnail.html'},
      {name : 'icon' , icon : 'fa-th' , template : '/static/ngTemplates/tableIcon.html'},
      {name : 'graph' , icon : 'fa-pie-chart' , template : '/static/ngTemplates/tableGraph.html'}
    ];

  $scope.options = {main : {icon : 'fa-envelope-o', text: 'im'} ,
    others : [{icon : '' , text : 'social' },
      {icon : '' , text : 'learning' },
      {icon : '' , text : 'leaveManagement' },
      {icon : '' , text : 'editProfile' },
      {icon : '' , text : 'editDesignation' }]
    };

  $scope.multiselectOptions = [{icon : 'fa fa-book' , text : 'Learning' },
    {icon : 'fa fa-bar-chart-o' , text : 'Performance' },
    {icon : 'fa fa-envelope-o' , text : 'message' }];

  $scope.aside = {title: 'Title', content: 'Hello Aside<br />This is a multiline message!'};

  $scope.asideState = {
    open: false
  };

  $scope.openAside = function(position, backdrop) {
    $scope.asideState = {
      open: true,
      position: position
    };

    function postClose() {
      $scope.asideState.open = false;
    }

    $aside.open({
      templateUrl: '/static/forms/aside.html',
      placement: position,
      size: 'lg',
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

  $scope.tableAction = function(urls , action , mode){
    console.log(mode);
    console.log(action);
    console.log(urls);
    if (typeof mode == 'undefined') {
      if (action == 'im') {
        var scope = angular.element(document.getElementById('instantMessangerCtrl')).scope();
        scope.$apply(function() {
          scope.addIMWindow(urls);
        });
      }
      // for the single select actions
    } else {
      if (mode == 'multi') {

      }
    }
  }

});
