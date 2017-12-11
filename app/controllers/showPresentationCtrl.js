'use strict';

app.controller('showPresentationCtrl', function($scope, $routeParams, $window, presentationFactory, userFactory) {

  let currentUserToken = userFactory.getCurrentUserToken();

  $scope.currentPresentation = {};

  const showPresentation = () => {
    presentationFactory.getPresentation($routeParams.presentationId, currentUserToken)
    .then(data => {
      $scope.currentPresentation = data;
    })
    .catch(error => console.log(error));
  };

  showPresentation();

});
