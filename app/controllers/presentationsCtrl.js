'use strict';

module.exports = function(
    $scope,
    $window,
    $routeParams,
    userFactory,
    presentationFactory
  ) {

  // holds authtoken to pass into api calls
  let currentUserToken = userFactory.getCurrentUserToken();

  // holds array of all presentations created by current user
  $scope.presentations = [];

  // calls get /presentations presentations#show endpoint
  // takes authorization token to pass to api call
  const getAllPresentations = () => {
    presentationFactory.getAllPresentations(currentUserToken)
    .then(presentations => {
      $scope.presentations = presentations.presentations;
    })
    .catch(error => {
      if (error.status === 401) {
        $window.location.href = '#!/login';
      }
    });
  };

  // takes id of presentation to destroy and user auth token
  // calls delete presentations/:id #destroy endpoint
  $scope.deletePresentation = (presentationId) => {
    presentationFactory.deletePresentation(presentationId, currentUserToken)
    .then(data => getAllPresentations())
    .catch(error => console.log(error));
  };

  // loads current presentation data when view loads
  getAllPresentations();

};
