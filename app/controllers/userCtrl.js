'use strict';

module.exports = function($scope, $window, userFactory, stringService) {

  // values filled for easy login,
  // delete values on deploy
  //creates model for holding form data for creating new user
  $scope.user = {
    firstName: '',
    lastName: '',
    email: 'example@example.com',
    password: '123456',
    passwordConfirmation: '123456'
  };

  $scope.loginError = false;
  $scope.errorTypes = [];
  $scope.errorVals = [];

  // posts user data to db endpoint post 'signup' 'users#create'
  // calls login() function on return to generate auth token for user
  $scope.signUp = () => {
    userFactory.signUp($scope.user)
    .then(response => $scope.logIn())
    .catch(error => {
      $scope.loginError = true;
      renderErrors(error.data);
    });
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


  // takes data from sign up errors
  // creates errorType and errorValues arrays, removes underscores in names
  const renderErrors = (errorData) => {
    let rawErrorTypes = Object.keys(errorData);
    $scope.errorTypes = rawErrorTypes.map(string => stringService.removeUnderscores(string));
    $scope.errorVals = Object.values(errorData);
  };

};
