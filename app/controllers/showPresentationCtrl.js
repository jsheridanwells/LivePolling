'use strict';

app.controller('showPresentationCtrl', function(
  $scope,
  $routeParams,
  $window,
  presentationFactory,
  userFactory
) {

  let currentUserToken = userFactory.getCurrentUserToken();

  $scope.count = 0;
  $scope.currentPresentation = {};

  const showPresentation = () => {
    presentationFactory.getPresentation($routeParams.presentationId, currentUserToken)
    .then(data => {
      $scope.currentPresentation = data.presentation;
    })
    .catch(error => console.log(error));
  };

  $scope.broadcast = () => {
    presentationFactory.toggleBroadcasting($scope.currentPresentation.id, currentUserToken)
    .then(data => {
      $scope.currentPresentation = data.presentation;
      alert('your presentation is not being broadcast');
    })
    .catch(error => console.log(error));
  };

  $scope.nextSlide = () => {
    if ($scope.count < $scope.currentPresentation.polls.length - 1) {
      $scope.count++;
    } else {
      $scope.count = 0;
    }
  };
  $scope.prevSlide = () => {
    if ($scope.count > 0) {
      $scope.count--;
    } else {
      $scope.count = 0;
    }
  };

  $scope.$on('$viewContentLoaded', () => {
    showPresentation();
  });

});
