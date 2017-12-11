'use strict';

app.controller('userCtrl', function($scope, $window, userFactory) {
  $scope.user = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  };

  $scope.signUp = () => {
    userFactory.signUp($scope.user)
    .then(response => $scope.logIn())
    .catch(error => console.log(error));
  };

  $scope.logIn = () => {
    userFactory.logIn($scope.user).
    then(userData => {
      console.log('made it all the way through');
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
