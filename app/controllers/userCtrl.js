'use strict';

module.exports = function($scope, $window, userFactory) {

  // values filled for easy login,
  // delete values on deploy
  //creates model for holding form data for creating new user
  $scope.user = {
    firstName: 'Jeremy',
    lastName: 'Wells',
    email: 'example@example.com',
    password: '123456',
    passwordConfirmation: '123456'
  };

  $scope.loginError = false;

  // posts user data to db endpoint post 'signup' 'users#create'
  // calls login() function on return to generate auth token for user
  $scope.signUp = () => {
    userFactory.signUp($scope.user)
    .then(response => $scope.logIn())
    .catch(error => console.log(error));
  };

  // takes email and password from user model
  // calls post 'authenticate' 'authentication#authenticate' endpoint
  // redirects to /presentations #index view
  $scope.logIn = () => {
    userFactory.logIn($scope.user).
    then(userData => {
      $window.location.href = '#!/presentations';
    })
    .catch(() => $scope.loginError = true);
  };

  // destroys current auth token
  $scope.logOut = () => {
    userFactory.logOut()
    .then(() => $window.location.href = '/')
    .catch((error => console.log(error)));
  };

};
