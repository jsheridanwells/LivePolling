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
      items_attributes: [],
      response_type: '1',
      feedback_type: '1'
  };
  //holds reponse_type items rendered to ng-model
  //saved as item attributes when createPoll() is called
  $scope.multipleChoice = [{content: '', correct: false},{content: '', correct: false}];
  $scope.trueFalse = [{content: 'True', correct: false},{content: 'False', correct: false}];
  $scope.writtenResponse = [{content: 'Written Response'}];

  // returns correct items_attributes array depending on responseType select
  // called in createPoll()
  // take in response type id (1, 2, or 3)
  // coerces responseType datatype because values come from html5 elements
  const selectResponseType = (responseTypeId) => {
    if (responseTypeId == 1) {
      return $scope.multipleChoice;
    } else if (responseTypeId == 2) {
      return $scope.trueFalse;
    } else if (responseTypeId == 3) {
      return $scope.writtenResponse;
    }
    else {
      console.error('response_type is invalid');
    }
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
  $scope.addItem = () => $scope.multipleChoice.push({content: ''});

  //removes item object from poll.items array
  $scope.removeItem = (index) => $scope.multipleChoice.splice(index, 1);

  // takes poll data object and user token
  // calls post /polls#create endpoint
  $scope.createPoll = () => {
    let pollObj = {};
    pollObj.poll = $scope.poll;
    pollObj.poll.items_attributes = selectResponseType($scope.poll.response_type);
    pollFactory.postNewPoll(pollObj, token)
    .then(data => $window.location.href = `#!presentations/${$routeParams.presentationId}`)
    .catch(error => console.log(error));
  };

  // loads current presentation data when view loads
  getCurrentPresentation();

};
