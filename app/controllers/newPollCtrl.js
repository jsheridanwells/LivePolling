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
      content: '',
      items_attributes: [{content: ''},{content: ''}],
      response_type: '1',
      feedback_type: '1'
  };

  // calls /presentations/:id#show endpoint
  // populates currentPresentation object
  const getCurrentPresentation = () => {
    presentationFactory.getPresentation($routeParams.presentationId, token)
    .then((presentation) => {
      $scope.currentPresentation = presentation.presentation;
      $scope.poll.presentation_id = presentation.presentation.id;
    })
    .catch(error => console.log(error));
  };

  // adds new item object to poll.items array
  $scope.addItem = () => $scope.poll.items_attributes.push({content: ''});

  //removes item object from poll.items array
  $scope.removeItem = (index) => $scope.poll.items_attributes.splice(index, 1);

  // takes poll data object and user token
  // calls post /polls#create endpoint
  $scope.createPoll = () => {
    let pollObj = {};
    pollObj.poll = $scope.poll;
    pollFactory.postNewPoll(pollObj, token)
    .then(data => $window.location.href = `#!presentations/${$routeParams.presentationId}`)
    .catch(error => console.log(error));
  };

  // loads current presentation data when view loads
  getCurrentPresentation();

};
