'use strict';

module.exports = function(
  $scope,
  $window,
  $timeout,
  userFactory,
  errorService
) {

  // values filled for easy login,
  // delete values on deploy
  //creates model for holding form data for creating new user
  $scope.user = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  };

  $scope.loginError = false;
  $scope.errors = {};
  $scope.loading = false;

  // posts user data to db endpoint post 'signup' 'users#create'
  // calls login() function on return to generate auth token for user
  $scope.signUp = () => {
    if (
        !$scope.user.password ||
        !$scope.user.passwordConfirmation ||
        $scope.user.password.length < 6 ||
        $scope.user.password !== $scope.user.passwordConfirmation
       ) {
      $scope.loginError = true;
      $scope.errors.types = ['Fix your password.'];
      $scope.user.password = '';
      $scope.user.passwordConfirmation = '';
    } else {
      $scope.loading = true;
      window.setTimeout(() => {
        userFactory.signUp($scope.user)
        .then(response => $scope.logIn())
        .catch(error => {
          $scope.loginError = true;
          $scope.errors = errorService.renderErrors(error.data);
        });
      }, 200);
    }
  };

  // takes email and password from user model
  // calls post 'authenticate' 'authentication#authenticate' endpoint
  // redirects to /presentations #index view
  $scope.logIn = () => {
    $scope.loading = true;
    window.setTimeout(() => {
      userFactory.logIn($scope.user).
      then(userData => {
        $window.location.href = '#!/presentations';
      })
      .catch(() => {
        $scope.loginError = true;
        $scope.loading = false;
      });
    }, 200);
  };

  // destroys current auth token
  $scope.logOut = () => {
    userFactory.logOut();
    $window.location.href = '#!/home';
    $timeout();
  };

};
