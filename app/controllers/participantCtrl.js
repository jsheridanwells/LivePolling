'use strict';

module.exports = function(
  $scope,
  $routeParams,
  $timeout,
  presentationFactory,
  api
) {

  let ActionCable = require('../../lib/node_modules/actioncable/lib/assets/compiled/action_cable.js');

  $scope.title = '';
  $scope.currentPresentation = {};

  const showPresentation = () => {
    presentationFactory.showToParticipant($routeParams.presentationId)
    .then((data) => {
      $scope.title = data.presentation.title;
      console.log($scope.currentPresentation);
      let cable = ActionCable.createConsumer(api.ws);
      cable.subscriptions.create({
        channel: 'PresentationChannel',
        presentation_id: $routeParams.presentationId
      }, {
        received: (data) => {
          $scope.currentPresentation = data;
          console.log('web socket data?', $scope.currentPresentation);
          console.log('web socket data 2?', $scope.currentPresentation.current_poll);
          console.log('web socket data 3?', $scope.currentPresentation.items);
          $timeout();
        }
      });
    })
    .catch(error => console.log(error));
  };

  $scope.$on('$viewContentLoaded', () => {
    showPresentation();
  });

};
