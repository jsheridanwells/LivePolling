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
      let cable = ActionCable.createConsumer(api.ws);
      cable.subscriptions.create({
        channel: 'PresentationChannel',
        presentation_id: $routeParams.presentationId
      }, {
        received: (data) => {
          $scope.currentPresentation = data;
          console.log('incomingdata', $scope.currentPresentation);
          $timeout();
        }
      });
    })
    .catch(error => console.log(error));
  };

  $scope.respond = (itemId) => {
    presentationFactory.sendResponse(itemId, $routeParams.presentationId, $scope.currentPresentation.current_poll_id)
    .then(data => console.log(data))
    .catch(error => console.log(error));
  };

  $scope.$on('$viewContentLoaded', () => {
    showPresentation();
  });

};
