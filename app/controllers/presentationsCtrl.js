'use strict';

app.controller('presentationsCtrl', function($scope, userFactory, presentationFactory) {
  let currentUser = userFactory.getCurrentUser();

  $scope.presentations = [];

  const getAllPresentations = () => {
    presentationFactory.getAllPresentations()
    .then(presentations => {
      $scope.presentations = presentations;
    })
    .catch(error => console.log(error));
  };

  getAllPresentations();

});
