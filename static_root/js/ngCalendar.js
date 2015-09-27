
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


var ngApp = angular.module('ngApp', ['libreHR.directives',]);

/*
This directive allows us to pass a function in on an enter key to do what we want.
 */

ngApp.config(['$httpProvider' , function($httpProvider){

  $httpProvider.defaults.xsrfCookieName = 'csrftoken';
  $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  $httpProvider.defaults.withCredentials = true;
}])

ngApp.controller('myCtrl', function($scope , $http , ngHttpSocket) {
  // main business logic starts from here

  $scope.category = 'NOT'
  $scope.reason = "Nothing";
  $scope.start = new Date();
  $scope.end = new Date();
  $scope.clicked = function(val){
    alert("clicked");
  };

  $scope.modalData = {val: "string"};

  $scope.leaveFormModal = false;
  $scope.leaveCompensationModal = false;
  $scope.toggleLeaveFormModal = function(){
  	$scope.leaveFormModal = !$scope.leaveFormModal;
  };
  $scope.toggleLeaveCompensationModal = function(){
    $scope.leaveCompensationModal = !$scope.leaveCompensationModal;
  }

  $scope.confirm = function() {
    alert("Submitted in the parent controller");
  }

  $scope.confirmNew = function() {
    alert("Submitted in the another parent controller");
  }

  $http.get("http://127.0.0.1:8000/api/leaveApplications/")
    .success(function(data){
      console.log(data);
  })
  $scope.leaveApplicationData = {category : 'NOT' , reason : '' , start : '' , end:'' , attachment :''};
  $scope.leaveApplicationData.statusMessage = '';
  $scope.uploadData = function(){
    var data = $scope.leaveApplicationData;
    var fd = new FormData();
    fd.append('attachment', data.attachment);
    fd.append('start' , dateToString(data.start))
    fd.append('end' , dateToString(data.end))
    fd.append('category' , data.category)
    fd.append('reason' , data.reason)
    var uploadUrl = "http://localhost:8000/api/leaveApplications/";
    ngHttpSocket.uploadFileToUrl(fd, uploadUrl);
    $scope.leaveApplicationData = {category : 'NOT' , reason : '' , start : '' , end:'' , attachment :''};
    $scope.leaveApplicationData.statusMessage = 'Success';
  }













  // Everything related to the calendar from is from this point

  $scope.listOfMonths = [{"val":0, "disp":"January"}, {"val":1, "disp":"February"}, {"val":2, "disp":"March"}, {"val":3, "disp":"April"}, {"val":4, "disp":"May"}, {"val":5, "disp":"June"}, {"val":6, "disp":"July"}, {"val":7, "disp":"August"}, {"val":8, "disp":"September"}, {"val":9, "disp":"October"}, {"val":10, "disp":"November"}, {"val":11, "disp":"December"}];
  $scope.listOfYears = [{"val":2015, "disp":"2015"}, {"val":2016, "disp":"2016"}, {"val":2017, "disp":"2017"}, {"val":2018, "disp":"2018"}, {"val":2019, "disp":"2019"}];
  $scope.listOfDays = [{"val":1, "disp":"Sunday"}, {"val":1, "disp":"Monday"}, {"val":1, "disp":"Tuesday"}, {"val":1, "disp":"Wednesday"}, {"val":1, "disp":"Thursday"}, {"val":1, "disp":"Friday"}, {"val":1, "disp":"Saturday"}];

  var calDate = new Date(); // the current date value known to the calender, also the selected. For a random month its 1st day of that month.
  var calMonth = calDate.getMonth();
  var calYear = calDate.getFullYear();

  datesMap = getDays(calMonth, calYear);
  $scope.dates = datesMap.days;
  $scope.dateFlags = datesMap.flags;
  $scope.dateDisp = calDate;
  $scope.dayDisp = $scope.listOfDays[calDate.getDay()].disp; // Find equivalent day name from the index

  $scope.dropYear ={"val":calYear, "disp":""}; // year selected in the drop down menu
  $scope.dropMonth = {"val":calMonth, "disp":""}; // Month selected in the drop down menu

  $scope.showDetails = function(val){
    if (datesMap.flags[val]=="Cur"){
      $scope.calDate = calDate.setFullYear(calYear, calMonth, $scope.dates[val]);
      $scope.dayDisp = $scope.listOfDays[calDate.getDay()].disp;
      $scope.dateDisp = calDate;
    }else if(datesMap.flags[val]=="Prev"){
      var selectedDate = $scope.dates[val];
      $scope.gotoPrev();
      $scope.calDate = calDate.setFullYear(calYear, calMonth, selectedDate);
      $scope.dayDisp = $scope.listOfDays[calDate.getDay()].disp;
      $scope.dateDisp = calDate;
    }else if(datesMap.flags[val]=="Next"){
      var selectedDate = $scope.dates[val];
      $scope.gotoNext();
      $scope.calDate = calDate.setFullYear(calYear, calMonth, selectedDate);
      $scope.dayDisp = $scope.listOfDays[calDate.getDay()].disp;
      $scope.dateDisp = calDate;
    };
  };

  $scope.gotoToday = function(){
    var calDate = new Date(); // current day
    calMonth = calDate.getMonth();
    calYear = calDate.getFullYear();
    $scope.dateDisp = calDate;
    $scope.dayDisp = $scope.listOfDays[calDate.getDay()].disp;
    datesMap = getDays(calMonth, calYear);
    $scope.dates = datesMap.days;
    $scope.dateFlags = datesMap.flags;
  };
  $scope.gotoNext = function(){
    calMonth +=1;
    calDate.setFullYear(calYear, calMonth, 1);
    datesMap = getDays(calMonth, calYear);
    $scope.dates = datesMap.days;
    $scope.dateFlags = datesMap.flags;
    $scope.dateDisp = calDate;
    $scope.dayDisp = $scope.listOfDays[calDate.getDay()].disp;
  };
  $scope.gotoPrev = function(){
    calMonth -=1;
    calDate.setFullYear(calYear, calMonth, 1);
    datesMap = getDays(calMonth, calYear);
    $scope.dates = datesMap.days;
    $scope.dateFlags = datesMap.flags;
    $scope.dateDisp = calDate;
    $scope.dayDisp = $scope.listOfDays[calDate.getDay()].disp;
  };
  $scope.gotoPerticular = function(){
    calMonth = $scope.dropMonth.val;
    calYear = $scope.dropYear.val;
    calDate.setFullYear(calYear, calMonth, 1);
    $scope.dateDisp = calDate;
    datesMap = getDays(calMonth, calYear);
    $scope.dates = datesMap.days;
    $scope.dateFlags = datesMap.flags;
  };
  $scope.range = function(min, max, step){
    step = step || 1;
    var input = [];
    for (var i = min; i <= max; i += step) input.push(i);
    return input;
  };

});

function dateToString(date){
  return date.getFullYear()+'-' + (date.getMonth()+1) + '-'+ (date.getDay());
}


function daysInMonth(month,year) {
  return new Date(year, month, 0).getDate();
}

function getDays(month , year){
 //====== This function gives the dates of the month and the year in the array.
  var numDays = daysInMonth(month+1, year); // Number of days in the current month
  var numDaysPrev = daysInMonth(month, year); // Number of days in the current month
  var dTemp = new Date();
  dTemp.setFullYear(year, month, 1)
  var firstDay = dTemp.getDay();
  var dayFlags = [];
  var days = [];
  var dayFlag = "";
  var tFlag = 0;
  var start = numDaysPrev + 1 - firstDay;
  var temp = start;
  var toAdd = temp;
  if (temp>numDaysPrev){
    temp = 1;
    tFlag = 1;
  }
  for (var i= 0; i<42 ; i +=1) {
    if (tFlag==0){
      dayFlag = "Prev";
      toAdd = temp;
      temp +=1;
      if (temp>numDaysPrev){
        temp = 1;
        tFlag = 1;
      }
    }else if (tFlag ==1){
      dayFlag="Cur";
      toAdd = temp;
      temp +=1;
      if (temp > numDays){
        temp =1;
        tFlag = 2;
      }
    }else if (tFlag ==2){
      dayFlag = "Next";
      toAdd = temp;
      temp += 1;
    }
    days.push(toAdd);
    dayFlags.push(dayFlag);
  }
  return {days: days, flags : dayFlags};
};

(function($){
	$(document).ready(function(){
		$('#ngCalAccordion li.active').addClass('open').children('ul').show();
		$('#ngCalAccordion li.has-sub>a').on('click', function(){
			$(this).removeAttr('href');
			var element = $(this).parent('li');
			if (element.hasClass('open')) {
				element.removeClass('open');
				element.find('li').removeClass('open');
				element.find('ul').slideUp(200);
			}
			else {
				element.addClass('open');
				element.children('ul').slideDown(200);
				element.siblings('li').children('ul').slideUp(200);
				element.siblings('li').removeClass('open');
				element.siblings('li').find('li').removeClass('open');
				element.siblings('li').find('ul').slideUp(200);
			}
		});
	});

})(jQuery);
