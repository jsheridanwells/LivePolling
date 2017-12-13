'use strict';

app.controller('showPresentationCtrl', function(
  $scope,
  $routeParams,
  $window,
  presentationFactory,
  userFactory
) {

  let currentUserToken = userFactory.getCurrentUserToken();

  //this is temporary to be replaced by slide_count column in db
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
    console.log('firing 1');
    presentationFactory.toggleBroadcasting($scope.currentPresentation.id, currentUserToken)
    .then(data => {
      $scope.currentPresentation = data.presentation;
      if ($scope.currentPresentation.broadcasting) {
        alert('You are now broadcasting.');
      } else {
        alert('You broadcast has ended.');
      }
      showPresentation();
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
