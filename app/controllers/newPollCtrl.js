'use strict';

module.exports = function(
  $scope,
  $routeParams,
  $window,
  pollFactory,
  presentationFactory,
  userFactory
){

  // holds authtoken to pass into api calls
  let token = userFactory.getCurrentUserToken();
  // holds presentation data rendered in initial view
  $scope.currentPresentation = {};
  //creates model for holding form data for creating new poll
  $scope.poll = {
    poll: {
      content: '',
      items_attributes: [{content: ''},{content: ''}],
      responseType: '1',
      feedbackType: '1'
    }
  };

  // calls /presentations/:id#show endpoint
  // populates currentPresentation object
  const getCurrentPresentation = () => {
    presentationFactory.getPresentation($routeParams.presentationId, token)
    .then((presentation) => {
      $scope.currentPresentation = presentation.presentation;
      $scope.poll.poll.presentation_id = presentation.presentation.id;
    })
    .catch(error => console.log(error));
  };

  // adds new item object to poll.items array
  $scope.addItem = () => {
    $scope.poll.poll.items_attributes.push({content: ''});
  };

  // takes poll data object and user token
  // calls post /polls#create endpoint
  $scope.createPoll = () => {
    pollFactory.postNewPoll($scope.poll, token)
    .then(data => $window.location.href = `#!presentations/${$routeParams.presentationId}`)
    .catch(error => console.log(error));
  };

  // loads current presentation data when view loads
  getCurrentPresentation();

};
