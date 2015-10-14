var genericSearch = angular.module('genericSearch', ['libreHR.directives' , 'ngSanitize', 'ui.bootstrap', 'ngAside']);

genericSearch.config(['$httpProvider' , function($httpProvider){
  $httpProvider.defaults.xsrfCookieName = 'csrftoken';
  $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  $httpProvider.defaults.withCredentials = true;
}]);



genericSearch.directive('tableRow', function () {
  return {
    template: '<tr>'+
      '<td><input type="checkbox" name="name" value="" disabled="true"></td>'+
      '<td ng-repeat = "(key , val) in data" ><span ng-bind-html="val | explodeObj"></span></td>'+
      '<td>'+
        '<div class="input-group-btn">'+
          '<a class="btn btn-primary btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="caret"></span></a>'+
          '<ul class="dropdown-menu pull-right">'+
            '<li ng-repeat="(key , val) in actions"><a href="{{val}}">{{key | humanize}}</a></li>'+
          '</ul>'+
          '<a class="btn btn-default btn-sm" ng-click = "performAction()"> <i class="fa {{action.icon}}"></i></a>'+
        '</div>'+
      '</td>'+
    '</tr>',
    restrict: 'A',
    transclude: true,
    replace: true,
    scope:{
      data : '=',
      actions :'=options',
      action : '=action',
      performAction :'&',
    },
    controller : function($scope){
      // console.log("row strip");
      // console.log($scope.actions);
      // console.log($scope.performAction);
    },
    // attrs is the attrs passed from the main scope
    link: function postLink(scope, element, attrs) {
      scope.$watch('visible', function(newValue , oldValue){

      });
    }
  };
});
// alert("Came in the ngSeachEmp js file");

genericSearch.controller('empSearchCtrl', function($scope , $http, $templateCache, $timeout , userProfileService , $aside) {
  // $scope.test = "some text";
  // $scope.tableData = [{firstName : 'Pradeep' , lastName : 'Yadav' , email: 'pradeep@cioc.com' , num : 5},
  //   {firstName : 'Sandeep' , lastName : 'Yadav' , email: 'sandeep@cioc.com' , num : 1},
  //   {firstName : 'Raj' , lastName : 'Yadav' , email: 'raj@cioc.com', num : 2},
  //   {firstName : 'Admin' , lastName : 'CIOC' , email: 'admin@cioc.com', num : 3}];
  $scope.tableData = [];
  $scope.searchText = '';
  $scope.originalTable = [];
  isSelectable = true;
  haveOptions = true;
  $scope.mainOption = {IM : 'http://instantmessage' , icon : 'fa-envelope-o'}
  $scope.options = {social : 'http://socialLink' , learning : 'http://learning' , leaveManagement : 'http://leave' , editProfile : 'http://editProfile' , editDesignation :'http://editDesignation'};
  $scope.itemsNumPerView = [5, 10, 20];
  $scope.itemsPerView = 5;
  $scope.pageList = [1];
  $scope.pageNo = 1; // default page number set to 0
  $scope.viewMode ='list';
  $scope.numOfPagesPerView = 5;
  // console.log($scope.tableData);
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


  $scope.fullTextSearch = function(str){
    rowsContaining = [];
    str = str.toLowerCase();
    // console.log(str);
    for (var i = 0; i < $scope.originalTable.length; i++) {

      row = $scope.originalTable[i];
      for (key in row){
        val = row[key].toString().toLowerCase();
        if (val.indexOf(str) !=-1){
          rowsContaining.push(i)
          break;
        };
      };
    } // main for loop
    // console.log(rowsContaining);
    // console.log($scope.tableData);
    $scope.tableData = [];
    for (var i = 0; i < rowsContaining.length; i++) {
      $scope.tableData.push($scope.originalTable[rowsContaining[i]]);
    }
  }
  $scope.openChatWindow = function(url){
    // console.log(url);
    // console.log("Will open the chat window");
    var scope = angular.element(document.getElementById('instantMessangerCtrl')).scope();
    // console.log(scope);
    scope.$apply(function() {
      scope.addIMWindow(url);
    });
  }

  $scope.fetchData = function(searchStr){
    if (typeof searchStr=='undefined') {
      searchStr = '';
    }
    fetch.method = 'GET';
    fetch.url = '/api/users/?&username__contains=' + searchStr + '&limit='+ $scope.itemsPerView + '&offset='+ ($scope.pageNo-1)*$scope.itemsPerView;
    $http({method: fetch.method, url: fetch.url, cache: $templateCache}).
      then(function(response) {
        // console.log(response);
        $scope.pageCount = Math.floor(response.data.count/$scope.itemsPerView)+1;
        if ($scope.pageCount<$scope.pageList[0]) {
          $scope.pageList = [1];
        } else {
          $scope.pageList = [$scope.pageList[0]];
        }
        for (var i = $scope.pageList[0]+1; i <= $scope.pageCount; i++) {
          if ($scope.pageList.length<$scope.numOfPagesPerView) {
            $scope.pageList.push(i);
          }
        }
        // console.log($scope.pageList);
        $scope.tableData = response.data.results;
        $scope.originalTable = angular.copy($scope.tableData);
        $scope.sortFlag = [];
        $scope.tableHeading = [];
        for (key in $scope.tableData[0]){
          $scope.tableHeading.push(key);
          $scope.sortFlag.push(0);  // by default no sort is applied , 1 for accending and -1 for descending
        }
        if (isSelectable) {
          $scope.tableHeading.unshift('Select');
          $scope.sortFlag.unshift(-2); // no sort can be applied on this column
        }

        if (haveOptions) {
          $scope.tableHeading.push('Options')
          $scope.sortFlag.push(-2); // no sort possible
        }
      }, function(response) {

    });
  }

  $scope.$watch('getStr' , function(newValue , oldValue){
    $scope.fetchData(newValue);
  });


  $scope.$watch('searchText', function(newValue , oldValue){
    parts = newValue.split('>');
    // console.log(parts);
    $scope.getStr = parts[0].trim();
    if (typeof parts[1] == 'undefined'){
      searchStr = '';
    }else{
      searchStr = parts[1].trim();
    };
    // console.log(searchStr);
    $scope.fullTextSearch(searchStr);
  });



  $scope.changePage = function(toPage){
    // change page number ot the seleted page
    $scope.pageNo = toPage;
    $scope.fetchData();
    // console.log("will change the page now" + toPage);

  }

  $scope.loadPrevSetPages = function(){
    // function to load prev set of pages
    var currentlyFirst = $scope.pageList[0];
    if (currentlyFirst!=1) {
      $scope.pageList = [currentlyFirst - $scope.numOfPagesPerView];
      // console.log(pageCount);
      for (var i = $scope.pageList[0]+1; i <= $scope.pageCount; i++) {
        if ($scope.pageList.length<$scope.numOfPagesPerView) {
          $scope.pageList.push(i);
        }
      }
    }
  }
  $scope.loadNextSetPages = function(){
    // function to load the next set of pages
    // console.log($scope.pageList[$scope.pageList.length -1]);
    var currentlyLast = $scope.pageList[$scope.pageList.length -1];
    if (currentlyLast!=$scope.pageCount) {
      $scope.pageList = [currentlyLast+1];
      // console.log(pageCount);
      for (var i = $scope.pageList[0]+1; i <= $scope.pageCount; i++) {
        if ($scope.pageList.length<$scope.numOfPagesPerView) {
          $scope.pageList.push(i);
        }
      }
    }
  }
  $scope.changeNumView = function(num){
    $scope.itemsPerView = num;
    $scope.changePage(1);
    $scope.fetchData();
    // console.log($scope.pageNo);
  }
  $scope.sort = function(col){
    $scope.tableSnap = angular.copy($scope.tableData);
    if ($scope.sortFlag[col]==-2) {
      console.log("No sort possible");
      return;
    }

    // console.log("will sort according to col " + col);
    colData = [];
    len =$scope.tableData.length;
    var indices = new Array(len);
    for (var i = 0; i < len; i++) {
      colData.push($scope.tableData[i][$scope.tableHeading[col]]);
      indices[i] = i;
    }
    if ($scope.sortFlag[col]==0 || $scope.sortFlag[col]==-1) {
      indices.sort(function (a, b) { return colData[a] < colData[b] ? -1 : colData[a] > colData[b] ? 1 : 0; });
      $scope.sortFlag[col] = 1;

    }else{
      indices.sort(function (a, b) { return colData[a] > colData[b] ? -1 : colData[a] < colData[b] ? 1 : 0; });
      $scope.sortFlag[col] = -1;
    }

    for (var i = 0; i < $scope.sortFlag.length; i++) {
      if (i !=col && $scope.sortFlag[i] !==-2) {
        $scope.sortFlag[i] = 0;
      }
    }
    // console.log(indices)
    // console.log($scope.sortFlag);
    for(var i =0 ; i < len ; i++){
      $scope.tableData[i] = angular.copy($scope.tableSnap[indices[i]])
    }
  }

});

function isNumber(num){
  if (typeof num=='string') {
    num = parseInt(num);
  }
  // console.log(num);
  // console.log(Number.isInteger(num));
  if (Number.isInteger(num)){
    return true;
  }else {
    return false;
  }
}

isUrl = function(str){
  // checks if the input is a url
  if (isNumber(str)) {
    // console.log("got a number hurray");
    return {flag : false , type : 'number'};
  }
  if ( str.length > 7) {
    // console.log("the input to isURL is " + str);
    str = str.toLowerCase()

    if (str.indexOf('http://') !=-1 || str.indexOf('https://') !=-1 ){
      // console.log('yes its a url');
      flag = true;
      if (str.endsWith('.jpg') || str.endsWith('png')) {
        type = 'image';
      }else if (str.endsWith('.pdf')) {
        type = 'pdf';
      }else if (str.endsWith('.py')) {
        type = 'python';
      }else if (str.endsWith('.odt')) {
        type = 'openDoc';
      }else{
        type = 'hyperLink';
      }
    }
  } else {
    flag = false;
    type = 'string';
  }

  return {flag : flag , type : type};
}

String.prototype.endsWith = function(str){
  if (str.length<this){
    return false;
  }
  return (this.match(str+"$")==str)
}
