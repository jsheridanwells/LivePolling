'use strict';

app.controller('presentationsCtrl', function(
    $scope,
    $window,
    $routeParams,
    userFactory,
    presentationFactory
  ) {

  let currentUserToken = userFactory.getCurrentUserToken();

  $scope.presentations = [];

  const getAllPresentations = () => {
    presentationFactory.getAllPresentations(currentUserToken)
    .then(presentations => {
      $scope.presentations = presentations;
    })
    .catch(error => {
      if (error.status === 401) {
        $window.location.href = '#!/login';
      }
    });
  };

  $scope.deletePresentation = (presentationId) => {
    presentationFactory.deletePresentation(presentationId, currentUserToken)
    .then(data => getAllPresentations())
    .catch(error => console.log(error));
  };

  getAllPresentations();

});
