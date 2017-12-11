'use strict';

app.controller('userCtrl', function($scope, userFactory) {
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

});
