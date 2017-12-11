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
    .then(response => console.log(response))
    .catch(error => console.log(error));
  };

  $scope.logIn = (user) => {
    userFactory.logIn(user).
    then(userData => {
      $window.location.href = '#!/presentations';
    })
    .catch();
  };

  $scope.logOut = () => {
    //log out the user
  };

});
