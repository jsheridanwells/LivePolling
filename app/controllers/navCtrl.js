'use strict';

module.exports = function(
  $scope,
  $window,
  userFactory
){

  $scope.loggedIn = () => userFactory.getCurrentUserToken();

  $scope.logOut = () => {
    userFactory.logOut();
    $window.location.href = '/';
  };

};
