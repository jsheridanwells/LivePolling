'use strict';

module.exports = function(
  $scope,
  $window,
  userFactory
){

  // calls from navbar partial for showing or hiding navbar
  // returns true or false depending on existence of user token
  $scope.loggedIn = () => userFactory.getCurrentUserToken();

  // calls logOut function from factory
  // destroy current session
  // redirects to home view
  $scope.logOut = () => {
    userFactory.logOut();
    $window.location.href = '/';
  };

};
