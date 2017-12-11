'use strict';

app.controller('userCtrl', function($scope, $window, userFactory) {

  // values filled for easy login,
  // delete values on deploy
  $scope.user = {
    firstName: 'Jeremy',
    lastName: 'Wells',
    email: 'example@example.com',
    password: '123456',
    passwordConfirmation: '123456'
  };

  $scope.signUp = () => {
    userFactory.signUp($scope.user)
    .then(response => $scope.logIn())
    .catch(error => console.log(error));
  };

  $scope.logIn = () => {
    userFactory.logIn($scope.user).
    then(userData => {
      $window.location.href = '#!/presentations';
    })
    .catch(error => console.log(error));
  };

  $scope.logOut = () => {
    userFactory.logOut()
    .then(() => $window.location.href = 'https://google.com')
    .catch(error => console.log(error));
  };

});
