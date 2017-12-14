'use strict';

module.exports = function(
  $scope,
  $routeParams,
  presentationFactory,
  api
) {

  let ActionCable = require('../../lib/node_modules/actioncable/lib/assets/compiled/action_cable.js');


  $scope.currentPresentation = {};

  const showPresentation = () => {
    presentationFactory.showToParticipant($routeParams.presentationId)
    .then(() => {
      let cable = ActionCable.createConsumer(api.ws);
      cable.subscriptions.create({
        channel: 'PresentationChannel',
        presentation_id: $routeParams.presentationId
      }, {
        received: (data) => {
          $scope.currentPresentation = data;
          console.log('web socket data?', $scope.currentPresentation);
        }
      });
    })
    .catch(error => console.log(error));
  };

  $scope.$on('$viewContentLoaded', () => {
    showPresentation();
  });

};
