'use strict';

module.exports = function(
  $scope,
  $window,
  $rootScope,
  $timeout,
  slideService,
  presentationFactory,
  userFactory
){

  let token = userFactory.getCurrentUserToken();

  // calls from navbar partial for showing or hiding navbar
  // returns true or false depending on existence of user token
  $scope.loggedIn = () => userFactory.getCurrentUserToken();

  // resets last presentation to 0
  // calls logOut function from factory
  // destroy current session
  // redirects to home view
  $scope.logOut = () => {
    if ($rootScope.broadcasting) {
      presentationFactory.toggleBroadcasting($rootScope.currentPresentationId, token);
    }
    if ($rootScope.currentPresentationId) {
      slideService.setSlideNumber(0, $rootScope.currentPresentationId, userFactory.getCurrentUserToken());
    }
    userFactory.logOut();
    $window.location.href = '#!/home';
    $timeout();
  };

};
