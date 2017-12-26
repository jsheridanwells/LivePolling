'use strict';

module.exports = function(
  $scope,
  $window,
  presentationFactory,
  userFactory,
  errorService
){

  // create model for creating a new presentation
  // calls function to get id of current user
  $scope.object = {};
  $scope.object.presentation = {
    user_id: userFactory.getCurrentUserId(),
    title: ''
  };
  $scope.formError = false;
  $scope.errors = {};

  // holds authtoken to pass into api calls
  let currentUserToken = userFactory.getCurrentUserToken();

  // takes presentation data object and user token
  // calls post /presentations#create endpoint
  // redirects to new presentation
  $scope.createPresentation = () => {
    presentationFactory.postPresentation($scope.object, currentUserToken)
    .then(newPresentation => $window.location.href = `#!/presentations/${newPresentation.data.presentation.id}`)
    .catch(error => {
      $scope.formError = true;
      $scope.errors = errorService.renderErrors(error.data);
    });
  };


};
