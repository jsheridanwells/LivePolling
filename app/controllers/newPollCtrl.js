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
      $scope.currentPresentation = presentation;
      $scope.poll.poll.presentation_id = presentation.id;
    })
    .catch(error => console.log(error));
  };

  $scope.addItem = () => {
    $scope.poll.poll.items_attributes.push({content: ''});
  };

  $scope.createPoll = () => {
    pollFactory.postNewPoll($scope.poll, token)
    .then(data => console.log('success ', data))
    .catch(error => console.log(error));
  };

  getCurrentPresentation();

});
