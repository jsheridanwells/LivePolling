'use strict';

module.exports = function(
    $scope,
    userFactory,
    $route
  ) {

  let token = userFactory.getCurrentUserToken();
  let userId = userFactory.getCurrentUserId();
  $scope.edit = false;

  const getUser = () => {
    $scope.user = userFactory.getCurrentUser();
  };

  $scope.toggleEdit = () => $scope.edit = !$scope.edit;

  $scope.update = () => {
    userFactory.updateUser($scope.user, userId, token)
    .then(user => {
      $scope.user = user;
      $scope.edit = false;
      $route.reload();
    })
    .catch(error => console.log(error));
  };

  $scope.$on('$viewContentLoaded', getUser());

};
