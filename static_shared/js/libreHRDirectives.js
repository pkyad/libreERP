var ngCIOC = angular.module('libreHR.directives' , []);

ngCIOC.directive('modal', function () {
  return {
    template: '<div class="modal fade">' +
        '<div class="modal-dialog">' +
          '<div class="modal-content">' +
            '<div class="modal-header">' +
              '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
              '<h4 class="modal-title">{{ title }}</h4>' +
            '</div>' +
            '<div class="modal-body">'+
              '<div ng-include="contentUrl"></div>'+
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>',
    restrict: 'E',
    transclude: true,
    replace:true,
    scope:{
      data : '=',
      visible : '=',
      submitFn :'&',
    },
    controller : function($scope){
    },
    // attrs is the attrs passed from the main scope
    link: function postLink(scope, element, attrs) {
      scope.title = attrs.title;
      scope.contentUrl = attrs.url;
      scope.$watch('visible', function(newValue , oldValue){
        if(newValue == true){
          $(element).modal('show');
        }
        else{
          $(element).modal('hide');
        }
      });

      $(element).on('shown.bs.modal', function(){
        scope.$apply(function(){
          scope.visible = true;
        });
      });

      $(element).on('hidden.bs.modal', function(){
        scope.$apply(function(){
          scope.data.statusMessage = '';
          scope.visible = false;
        });
      });
    }
  };
});

ngCIOC.directive('messageNotification', function () {
  return {
    template: '<li class="container-fluid" >'+
      '<a href="#" class="row">'+
        '<img class="img-circle" src="{% static 'images/user3-128x128.jpg' %}" alt="My image" style="width:55px;height:55px;"/>'+
        '<div class="col-md-10 pull-right">'+
          '<span class="text-muted">Nathan</span><small style="position:absolute;right:0px;" class="pull-right text-muted">5M <i class="fa fa-clock-o "></i></small>'+
          '<br>Why not buy a new awesome theme?'+
        '</div>'+
      '</a>'+
    '</li>'+
    restrict: 'E',
    transclude: true,
    replace:true,
    scope:{
      data : '=',
      visible : '=',
      submitFn :'&',
    },
    controller : function($scope){
    },
    // attrs is the attrs passed from the main scope
    link: function postLink(scope, element, attrs) {
      scope.title = attrs.title;
      scope.contentUrl = attrs.url;
      scope.$watch('visible', function(newValue , oldValue){
        if(newValue == true){
          $(element).modal('show');
        }
        else{
          $(element).modal('hide');
        }
      });
    }
  };
});

ngCIOC.directive('fileModel', ['$parse', function ($parse) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var model = $parse(attrs.fileModel);
      var modelSetter = model.assign;

      element.bind('change', function(){
        scope.$apply(function(){
          modelSetter(scope, element[0].files[0]);
        });
      });
    }
  };
}]);

ngCIOC.service('ngHttpSocket', ['$http', function ($http) {
  this.uploadFileToUrl = function(data, uploadUrl){

    $http.post(uploadUrl, data, {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
    })
    .success(function(){
    })
    .error(function(){

    });
  }
}]);


/*
This directive allows us to pass a function in on an enter key to do what we want.
 */

ngCIOC.directive('ngEnter', function () {
  return function (scope, element, attrs) {
    element.bind("keydown keypress", function (event) {
      if(event.which === 13) {
        scope.$apply(function (){
          scope.$eval(attrs.ngEnter);
        });
        event.preventDefault();
      }
    });
  };
});
