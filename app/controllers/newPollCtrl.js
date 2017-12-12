'use strict';

app.controller('newPollCtrl', function(
  $scope,
  $routeParams,
  $window,
  pollFactory,
  userFactory
){

  let token = userFactory.getCurrentUserToken();
  let currentPresentationId = $routeParams.presentationId;

  $scope.poll = {
    presentation_id: currentPresentationId,
    content: '',
    items_attributes: [{content: ''},{content: ''}]
  };

  $scope.addItem = () => {
    $scope.poll.items.push({content: ''});
  };

  $scope.createPoll = () => {
    console.log('createPoll $scope ', $scope.poll, 'token is ', token);
    pollFactory.postNewPoll($scope.poll, token)
    .then(data => console.log('success ', data))
    .catch(error => console.log('we got an error ', error));
  };

});
