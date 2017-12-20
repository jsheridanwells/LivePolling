'use strict';

module.exports = function(
  $scope,
  $routeParams,
  $timeout,
  presentationFactory,
  api
) {

  // instantiates ActionCable JS module
  let ActionCable = require('../../lib/node_modules/actioncable/lib/assets/compiled/action_cable.js');

  // creates model for current presentation data
  $scope.title = '';
  $scope.currentPresentation = {};
  // activated boolean renders active ng-click elements when true
  // after user fires respond(), reset to false to disable ng-click elements
  $scope.activated = true;
  $scope.response = {};
  // $scope.response.written = '';
  // calls show-presentation/:id' presentations#show_to_participant' endpoint
  // populates currentPresentation object
  // creates subscription to presentation_channel_#(presentationID)
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
          console.log(data);
          $scope.activated = true;
          $scope.currentPresentation = data;
          $timeout();
        }
      });
    })
    .catch(error => console.log(error));
  };

  // calls 'respond/:presentation_id/:poll_id' 'responses#add' endpoint
  // submits id of item chosen to db, disables ng-click with $scope.activated
  $scope.respond = (itemId) => {
    console.log('getting send to respond: ', $scope.response.written);
    $scope.activated = false;
    presentationFactory.sendResponse(itemId, $routeParams.presentationId, $scope.currentPresentation.current_poll_id)
    .then(data => console.log(data))
    .catch(error => console.log(error));
  };

  // loads current presentation data when view loads
  $scope.$on('$viewContentLoaded', () => {
    showPresentation();
  });

};
