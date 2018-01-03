'use strict';

module.exports = function(
  $scope,
  $routeParams,
  $window,
  $timeout,
  api,
  presentationFactory,
  pollFactory,
  userFactory,
  responseTallyService
) {
  // instantiates ActionCable JS module
  let ActionCable = require('../../lib/node_modules/actioncable/lib/assets/compiled/action_cable.js');
  // holds authtoken to pass into api calls
  let currentUserToken = userFactory.getCurrentUserToken();

  // creates model for current presentation data
  $scope.currentPresentation = {};
  // holds array of percentage responses for each poll item displayed
  // updated via websocket subscription
  $scope.responsePercentageArr = [];

  // shows and hides results of polls if results are to be shown on the next slide
  $scope.resultsVisible = false;

  // makes title field editable in presentation nav bar
  $scope.editTitle = false;

  // calls presentations/:id' presentations#show' endpoint
  // populates currentPresentation object
  // creates subscription to response_channel_#(presentationID)
  // when users at the show-to-participant view interact with a response object
  // data is streamed to current user
  const showPresentation = () => {
    presentationFactory.getPresentation($routeParams.presentationId, currentUserToken)
    .then(data => {
      $scope.currentPresentation = data.presentation;
      // if ($scope.currentPresentation.polls.length > 0) {
      //   $scope.responsePercentageArr = responseTallyService.tallyResponses($scope.currentPresentation.polls[$scope.currentPresentation.current_slide].items);
      // }
      $scope.responsePercentageArr = [25, 30, 90, 50, 70, 80, 100].reverse();
      console.log('current presentation, ', $scope.currentPresentation);
      console.log('response arr ', $scope.responsePercentageArr);
      let cable = ActionCable.createConsumer(api.ws);
      cable.subscriptions.create({
        channel: 'ResponseChannel',
        presentation_id: $routeParams.presentationId
      }, {
        received: (responses) => {
          $scope.responsePercentageArr = responseTallyService.tallySocketResponses(responses.data);
          $timeout();
        }
      });

    })
    .catch(error => console.log(error));
  };

  // used for changing slideNumber after loading, editing, and deleting slides
  const setSlideNumber = (slideNumber) => {
    let presentationObj = {presentation: {current_slide: slideNumber}};
    presentationFactory.editPresentation(presentationObj, $routeParams.presentationId, currentUserToken)
    .then(data => $scope.currentPresentation = data.presentation)
    .catch(error => console.log(error));
  };

  // sets editTitle to true to enable form for updating presentation title
  $scope.toggleEditTitle = () => {
    $scope.editTitle = !$scope.editTitle;
  };

  // changes attributes of current presentation in database
  $scope.updatePresentation = () => {
    let presentationObj = {};
    presentationObj.presentation = $scope.currentPresentation;
    presentationFactory.editPresentation(presentationObj, $scope.currentPresentation.id, currentUserToken)
    .then(data => {
      $scope.editTitle = false;
      $scope.currentPresentation = data.presentation;
    })
    .catch(error => console.log(error));
  };


  // takes id of current presentation and user auth token
  // calls patch 'broadcast/:id' 'presentations#broadcast' endpoint
  // toggles boolean in presentations_broadcasting db column
  // data in presentations with broadcasting:true are made available w/o auth
  $scope.broadcast = () => {
    presentationFactory.toggleBroadcasting($scope.currentPresentation.id, currentUserToken)
    .then(data => {
      $scope.currentPresentation = data.presentation;
      showPresentation();
    })
    .catch(error => console.log(error));
  };

  // takes id of current presentation and user auth token
  // calls patch 'next/:id', 'presentations#next_slide' endpoint
  // increments integer in presentations_current_slide db column
  // determines current slide index in current presentation for presenters and viewers
  $scope.nextSlide = () => {
    presentationFactory.nextSlide($scope.currentPresentation.id, currentUserToken)
    .then(data => {
      $scope.currentPresentation = data.presentation;
      $scope.responsePercentageArr = responseTallyService.tallyResponses($scope.currentPresentation.polls[$scope.currentPresentation.current_slide].items);
    })
    .catch(error => console.log(error));
  };

  // takes id of current presentation and user auth token
  // calls patch 'next/:id', 'presentations#next_slide' endpoint
  // decrements integer in presentations_current_slide db column
  // determines current slide index in current presentation for presenters and viewers
  $scope.prevSlide = () => {
    presentationFactory.prevSlide($scope.currentPresentation.id, currentUserToken)
    .then(data => {
      $scope.currentPresentation = data.presentation;
      $scope.responsePercentageArr = responseTallyService.tallyResponses($scope.currentPresentation.polls[$scope.currentPresentation.current_slide].items);
    })
    .catch(error => console.log(error));
  };

  // disables responding in participants' view
  // by sending { responding: false } message via websockets via presentations_#:id channel
  // shows results by setting $scope.resultsVisible to true
  $scope.showResults = () => {
    presentationFactory.showResults($scope.currentPresentation.id, currentUserToken)
    .then(() => $scope.resultsVisible = true)
    .catch(error => console.log(error));
  };

  $scope.deletePoll = (pollId) => {
    pollFactory.deletePoll(pollId, currentUserToken)
    .then(data => $scope.currentPresentation = data.presentation)
    .catch(error => console.log(error));
  };

  // loads current presentation data when view loads
  $scope.$on('$viewContentLoaded', () => {
    showPresentation();
  });

};
