'use strict';

module.exports = function(
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
    .then(newPresentation => $window.location.href = `#!/presentations/${newPresentation.data.presentation.id}`)
    .catch(error => console.log(error));
  };


};
