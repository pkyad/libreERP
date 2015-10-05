
processNotification = function(args){
  // console.log(args);
  var scope = angular.element(document.getElementById('headerNotificationCtrl')).scope();
  scope.$apply(function() {
    // console.log(notificationCtrlScope);
    scope.fetchNotifications();
  });
}


wampConnection.onopen = function (session) {

  session.subscribe('service.notification.'+wampBindName, processNotification).then(
    function (sub) {
      console.log("subscribed to topic 'notification'");
    },
    function (err) {
      console.log("failed to subscribed: " + err);
    }
  );
};
