'use strict';

app.controller('participantCtrl', function(
  $scope,
  $routeParams,
  presentationFactory
) {

  //this is temporary to be replaced by slide_count column in db
  $scope.count = 0;

  $scope.currentPresentation = {};

  const showPresentation = () => {
    console.log('firing 1');
    presentationFactory.showToParticipant($routeParams.presentationId)
    .then(data => {
      console.log(data);
      if (data.message) {
        console.log('firing if');
        $scope.currentPresentation.message = data.message;
        $scope.currentPresentation.title = data.title;
      } else {
        console.log('firing else');
        $scope.currentPresentation = data.presentation;
      }
    })
    .catch(error => console.log(error));
  };

  $scope.$on('$viewContentLoaded', () => {
    showPresentation();
  });

});
