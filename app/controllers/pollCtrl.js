'use strict';

module.exports = function(
  $scope,
  $rootScope,
  $routeParams,
  $window,
  $timeout,
  pollFactory,
  presentationFactory,
  userFactory,
  slideService
){

  // holds authtoken to pass into api calls
  let token = userFactory.getCurrentUserToken();
  //used to toggle create or update button/function
  $scope.edit = false;
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
    if ($routeParams.pollId) {
      $scope.edit = true;
      $scope.currentPresentation.title = 'Edit Poll';
      $scope.currentPresentation.id = $routeParams.presentationId;
      pollFactory.getPoll($routeParams.pollId, token)
      .then(poll => {
        $scope.poll = poll.data.poll;
        if ($scope.poll.response_type == 1) {
          $scope.multipleChoice = $scope.poll.items;
        } else if ($scope.poll.response_type == 2) {
          $scope.trueFalse = $scope.poll.items;
        }
        $scope.poll.response_type = $scope.poll.response_type.toString();
        $scope.poll.feedback_type = $scope.poll.feedback_type.toString();
      })
      .catch(error => console.log(error));
    } else {
      presentationFactory.getPresentation($routeParams.presentationId, token)
      .then((data) => {
        $scope.currentPresentation = data.presentation;
        $scope.poll.presentation_id = data.presentation.id;
      })
      .catch(error => console.log(error));
    }
  };

  // adds new item object to poll.items array
  $scope.addItem = () => $scope.multipleChoice.push({content: ''});

  //removes item object from poll.items array
  $scope.removeItem = (index) => {
    if ($scope.multipleChoice[index].id) {
      let itemId = $scope.multipleChoice[index].id;
      pollFactory.deleteItem(itemId, token)
      .then(() => $scope.multipleChoice.splice(index, 1))
      .catch(error => console.log(error));
    } else {
      $scope.multipleChoice.splice(index, 1);
    }
  };

  // takes poll data object and user token
  // calls post /polls#create endpoint
  $scope.createPoll = () => {
    let pollObj = {};
    pollObj.poll = $scope.poll;
    pollObj.poll.items_attributes = selectResponseType($scope.poll.response_type);
    pollFactory.postNewPoll(pollObj, token)
    .then(() => {
      slideService.setSlideNumber(($scope.currentPresentation.polls.length), $rootScope.currentPresentationId, token);
      $window.location.href = `#!presentations/${$routeParams.presentationId}`;
      $timeout();
    })
    .catch(error => console.log(error));
  };

  $scope.editPoll = () => {
    let pollObj = {
      poll: {
        content: $scope.poll.content,
        response_type: $scope.poll.response_type,
        feedback_type: $scope.poll.feedback_type,
        items_attributes: selectResponseType($scope.poll.response_type)
      }
    };
    pollFactory.updatePoll(pollObj, $routeParams.pollId, token)
    .then(data => {
      $window.location.href = `#!presentations/${$routeParams.presentationId}`;
    })
    .catch(error => console.log(error));
  };

  // loads current presentation data when view loads
  $scope.$on('$viewContentLoaded', () => {
    getCurrentPresentation();
  });

  // resets slide number to currentPoll when presentation is exited
  // $scope.$on('$destroy', () => {
  //   slideService.setSlideNumber($rootScope.holdSlide, $rootScope.currentPresentationId, token);
  // });

};
