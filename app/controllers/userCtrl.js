'use strict';

app.controller('userCtrl', function($scope) {
  $scope.user = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  };

  $scope.signUp = (user) => {
    console.log(user);
  };

});
