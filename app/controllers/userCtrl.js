'use strict';

app.controller('userCtrl', function($scope, $window, userFactory) {
  $scope.user = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  };

  $scope.signUp = (user) => {
    userFactory.signUp(user)
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
