'use strict';

app.controller('newPollCtrl', function(
  $scope,
  $routeParams,
  $window,
  pollFactory,
  presentationFactory,
  userFactory
){

  let token = userFactory.getCurrentUserToken();
  $scope.currentPresentation = {};
  $scope.poll = {
    poll: {
      content: '',
      items_attributes: [{content: ''},{content: ''}]
    }
  };

  const getCurrentPresentation = () => {
    presentationFactory.getPresentation($routeParams.presentationId, token)
    .then((presentation) => {
      $scope.currentPresentation = presentation.presentation;
      $scope.poll.poll.presentation_id = presentation.presentation.id;
    })
    .catch(error => console.log(error));
  };

  $scope.addItem = () => {
    $scope.poll.poll.items_attributes.push({content: ''});
  };

  $scope.createPoll = () => {
    pollFactory.postNewPoll($scope.poll, token)
    .then(data => $window.location.href = `#!presentations/${$routeParams.presentationId}`)
    .catch(error => console.log(error));
  };

  getCurrentPresentation();

});
