'use strict';

app.controller('navCtrl', function(
  $scope,
  $window,
  userFactory
){

  $scope.loggedIn = () => userFactory.getCurrentUserToken();

  $scope.logOut = () => {
    userFactory.logOut();
    $window.location.href = '/';
  };

});
