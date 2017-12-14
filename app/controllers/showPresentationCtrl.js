'use strict';

module.exports = function(
  $scope,
  $routeParams,
  $window,
  presentationFactory,
  userFactory
) {

  let currentUserToken = userFactory.getCurrentUserToken();

  $scope.currentPresentation = {};

  const showPresentation = () => {
    presentationFactory.getPresentation($routeParams.presentationId, currentUserToken)
    .then(data => {
      $scope.currentPresentation = data.presentation;
      console.log('current presentation ', $scope.currentPresentation);
    })
    .catch(error => console.log(error));
  };

  $scope.broadcast = () => {
    presentationFactory.toggleBroadcasting($scope.currentPresentation.id, currentUserToken)
    .then(data => {
      $scope.currentPresentation = data.presentation;
      showPresentation();
    })
    .catch(error => console.log(error));
  };

  $scope.nextSlide = () => {
    presentationFactory.nextSlide($scope.currentPresentation.id, currentUserToken)
    .then(data => $scope.currentPresentation = data.presentation)
    .catch(error => console.log(error));
  };

  $scope.prevSlide = () => {
    presentationFactory.prevSlide($scope.currentPresentation.id, currentUserToken)
    .then(data => $scope.currentPresentation = data.presentation)
    .catch(error => console.log(error));
  };

  $scope.$on('$viewContentLoaded', () => {
    showPresentation();
  });

};
