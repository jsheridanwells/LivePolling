'use strict';

module.exports = function(
  $scope,
  $window,
  $rootScope,
  slideService,
  userFactory
){

  // calls from navbar partial for showing or hiding navbar
  // returns true or false depending on existence of user token
  $scope.loggedIn = () => userFactory.getCurrentUserToken();

  // calls logOut function from factory
  // destroy current session
  // redirects to home view
  $scope.logOut = () => {
    slideService.setSlideNumber(0, $rootScope.currentPresentationId, userFactory.getCurrentUserToken());
    userFactory.logOut();
    $window.location.href = '/';
  };

};
