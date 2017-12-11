'use strict';

app.controller('presentationsCtrl', function($scope, userFactory, presentationFactory) {
  let currentUserToken = userFactory.getCurrentUserToken();

  $scope.presentations = [];

  const getAllPresentations = () => {
    presentationFactory.getAllPresentations(currentUserToken)
    .then(presentations => {
      $scope.presentations = presentations;
    })
    .catch(error => console.log('error in getAllPresentations: ', error));
  };

  getAllPresentations();

});
