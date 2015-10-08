var genericSearch = angular.module('genericSearch', ['libreHR.directives','ngSanitize' ]);

genericSearch.config(['$httpProvider' , function($httpProvider){
  $httpProvider.defaults.xsrfCookieName = 'csrftoken';
  $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  $httpProvider.defaults.withCredentials = true;
}]);

// alert("Came in the ngSeachEmp js file");

genericSearch.controller('empSearchCtrl', function($scope , $http, $templateCache, $timeout , userProfileService) {
  // $scope.test = "some text";
  // $scope.tableData = [{firstName : 'Pradeep' , lastName : 'Yadav' , email: 'pradeep@cioc.com' , num : 5},
  //   {firstName : 'Sandeep' , lastName : 'Yadav' , email: 'sandeep@cioc.com' , num : 1},
  //   {firstName : 'Raj' , lastName : 'Yadav' , email: 'raj@cioc.com', num : 2},
  //   {firstName : 'Admin' , lastName : 'CIOC' , email: 'admin@cioc.com', num : 3}];
  $scope.tableData = [];
  $scope.searchText = '';
  $scope.originalTable = [];
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

  $scope.$watch('getStr' , function(newValue , oldValue){
    $scope.method = 'GET';
    $scope.url = 'http://localhost:8000/api/users/?username__contains=' + newValue;
    $http({method: $scope.method, url: $scope.url, cache: $templateCache}).
      then(function(response) {
        // console.log(response.data);
        $scope.tableData = response.data;
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

  isSelectable = true;
  haveOptions = true;
  $scope.mainOption = {IM : 'http://instantmessage' , icon : 'fa-envelope-o'}
  $scope.options = {social : 'http://socialLink' , learning : 'http://learning' , leave : 'http://leave' , editMaster : 'http://editMaster'};

  // console.log($scope.tableData);


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




// var getResult = function(){
//   $('#searchResultsTable').show();
//   var searchString = $('#searchString').val();
//   var jqxhr = $.get( "http://localhost:8000/api/users/?username__contains="+searchString,{}, function() {
//     // alert( "success" );
//   })
//   .done(function(data) {
//     $('#searchResultsTable tbody').html('');
//     for (var i = 0; i < data.length; i++) {
//
//       newRow = '<tr><td>'+data[i].first_name+'</td><td>';
//       newRow += data[i].last_name+'</td><td>';
//       newRow += data[i].email+'</td><td style="text-align: center;">';
//       newRow += '<div class="btn-group">'+
//           '<button type="button" class="btn btn-default"><i class="fa fa-envelope-o"></i></button>'+
//           '<button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+
//           '<span class="caret"></span><span class="sr-only">Toggle Dropdown</span></button>'+
//           '<ul class="dropdown-menu">'+
//             '<li><a href="#">Social</a></li>'+
//             '<li><a href="#">Projects</a></li>'+
//             '<li><a href="#">Learning</a></li>'+
//             '<li><a href="#">Payroll</a></li>'+
//             '<li><a href="#">Leave management</a></li>'+
//             '<li role="separator" class="divider"></li>'+
//             '<li><a href='+ 'HR/admin/?action=editProfile&username='+ data[i].username +'>Edit master details</a></li>'+
//           '</ul>'+
//         '</div>';
//       $('#searchResultsTable tbody').append(newRow);
//     };
//   })
//   .fail(function() {
//     // alert( "error" );
//   })
//   .always(function() {
//     // alert( "finished" );
//   });
// }
