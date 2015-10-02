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

ngCIOC.filter('timeAgo' , function(){
  return function(input){
    t = new Date(input);
    var now = new Date();
    var diff = Math.floor((now - t)/60000)
    if (diff<60) {
      return diff+'M';
    }else if (diff>=60 && diff<60*24) {
      return Math.floor(diff/60)+'H';
    }else if (diff>=60*24) {
      return Math.floor(diff/(60*24))+'D';
    }
  }
})

ngCIOC.filter('getIcon' , function(){
  return function(input){
    // console.log(scope.common);
    switch (input) {
      case 'LM':
        return 'fa-book';
      case 'PLM':
        return 'fa-square-o';
      case 'Social':
        return 'fa-facebook-square';
      case 'Payroll':
        return 'fa-money'
      default:
        return 'fa-bell-o';
    }
  }
})

ngCIOC.filter('getDP' , function(){
  return function(input , scope){
    if (typeof scope.common[input]=="undefined") {
      var user = getUser(input);
      scope.common[input]={name: user.first_name+" "+user.last_name , DP : user.profile.displayPicture , email : user.email};
    }
    return scope.common[input].DP;
  }
})

ngCIOC.filter('getName' , function(){
  return function(input , scope){
    if (typeof scope.common[input]=="undefined") {
      var user = getUser(input);
      scope.common[input]={name: user.first_name+" "+user.last_name , DP : user.profile.displayPicture , email : user.email};
    }
    return scope.common[input].name;
  }
})

ngCIOC.filter('decorateCount' , function(){
  return function(input){
    if (input ==1){
      return "";
    }
    else {
      return "("+input+")";
    }
  }
})


ngCIOC.directive('messageStrip', function () {
  return {
    template: '<li class="container-fluid navBarInfoList" >'+
      '<a href="#" class="row" style="position: relative; top:-7px; text-decoration:none !important;">'+
        '<img class="img-circle" ng-src="{{data.originator | getDP:this}}"  alt="My image" style="width:50px;height:50px;position: relative; top:-8px; "/>'+
        '<div class="col-md-10 pull-right" style="position: relative; top:-10px">'+
          '<span class="text-muted">{{data.originator | getName:this}}</span> {{data.count | decorateCount}}<small style="position:absolute;right:0px;" class="pull-right text-muted">{{data.created | timeAgo}} <i class="fa fa-clock-o "></i></small>'+
          '<br>{{data.message | limitTo:45}}'+
        '</div>'+
      '</a>'+
    '</li>',
    restrict: 'E',
    transclude: true,
    replace:true,
    scope:{
      data : '=',
      common :'=',
    },
    controller : function($scope){
    },
    // attrs is the attrs passed from the main scope
    link: function postLink(scope, element, attrs) {
      scope.$watch('visible', function(newValue , oldValue){

      });
    }
  };
});

ngCIOC.directive('notificationStrip', function () {
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
      scope.$watch('visible', function(newValue , oldValue){

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
