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
      console.log('current presentation ', $scope.currentPresentation);
    })
    .catch(error => console.log(error));
  };

  $scope.$on('$viewContentLoaded', () => {
    showPresentation();
  });

  $scope.nextSlide = () => {
    if ($scope.count < $scope.currentPresentation.polls.length - 1) {
      $scope.count++;
      console.log($scope.count);
    } else {
      $scope.count = 0;
    }
  };
  $scope.prevSlide = () => {
    if ($scope.count > 0) {
      $scope.count--;
      console.log($scope.count);
    } else {
      $scope.count = 0;
    }
  };


});
