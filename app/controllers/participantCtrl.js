'use strict';

module.exports = function(
  $scope,
  $routeParams,
  presentationFactory,
  api
) {

  let ActionCable = require('../../lib/node_modules/actioncable/lib/assets/compiled/action_cable.js');


  $scope.currentPresentation = {};

  // const showPresentation = () => {
  //   presentationFactory.showToParticipant($routeParams.presentationId)
  //   .then(data => {
  //     if (data.message) {
  //       $scope.currentPresentation.message = data.message;
  //       $scope.currentPresentation.title = data.title;
  //     } else {
  //       $scope.currentPresentation = data.presentation;
  //     }
  //   })
  //   .catch(error => console.log(error));
  // };

  const showPresentation = () => {
    presentationFactory.showToParticipant($routeParams.presentationId)
    .then(() => {
      let cable = ActionCable.createConsumer(api.ws);
      cable.subscriptions.create({
        channel: 'PresentationChannel',
        id: $routeParams.presentationId
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
