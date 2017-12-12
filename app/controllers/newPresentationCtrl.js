'use strict';

app.controller('newPresentationCtrl', function(
  $scope,
  $window,
  presentationFactory,
  userFactory
){

  $scope.object = {};
  $scope.object.presentation = {
    user_id: userFactory.getCurrentUserId(),
    title: ''
  };

  let currentUserToken = userFactory.getCurrentUserToken();

  $scope.createPresentation = () => {
    presentationFactory.postPresentation($scope.object, currentUserToken)
    .then(newPresentation => console.log('new presentation', newPresentation))
    .catch(error => console.log(error));
  };


});
