'use strict';

app.controller('newPollCtrl', function(
  $scope,
  $routeParams,
  $window,
  pollFactory
){

  let currentPresentationId = $routeParams.presentationId;

  $scope.poll = {
    presentationId: currentPresentationId,
    content: '',
    items: [{content: ''},{content: ''}]
  };

  $scope.createPoll = () => {
    pollFactory.newPoll($scope.poll)
    .then()
    .catch();
  };

  console.log('items length ', $scope.poll.items.length);

});
