'use strict';

module.exports = function(
    $scope,
    userFactory
  ) {

  const getUser = () => {
    $scope.user = userFactory.getCurrentUser();
    console.log($scope.user);
  };

  $scope.$on('$viewContentLoaded', getUser());

};
