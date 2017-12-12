'use strict';

app.controller('newPresentationCtrl', function(
  $scope,
  $window,
  presentationFactory,
  userFactory
){

  $scope.presentation = {title: ''};

  let currentUserToken = userFactory.getCurrentUserToken();

  $scope.createPresentation = () => {
    presentationFactory.postPresentation($scope.presentation, currentUserToken)
    .then(newPresentation => console.log('new presentation', newPresentation))
    .catch(error => console.log(error));
  };


});
