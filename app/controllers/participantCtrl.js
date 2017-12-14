'use strict';

module.exports = function(
  $scope,
  $routeParams,
  presentationFactory
) {

  //this is temporary to be replaced by slide_count column in db

  $scope.currentPresentation = {};

  const showPresentation = () => {
    presentationFactory.showToParticipant($routeParams.presentationId)
    .then(data => {
      console.log(data);
      if (data.message) {
        $scope.currentPresentation.message = data.message;
        $scope.currentPresentation.title = data.title;
      } else {
        $scope.currentPresentation = data.presentation;
      }
    })
    .catch(error => console.log(error));
  };

  $scope.$on('$viewContentLoaded', () => {
    showPresentation();
    let action = ActionCable.new();
    console.log('action?', action);
  });

};
