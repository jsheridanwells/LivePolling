'use strict';

app.factory('userFactory', function($q, $http, api) {

  let currentUser = null;

  const signUp = (user) => {
    return $q((resolve, reject) => {
      let userObj = angular.toJson({
        users: {
          first_name: user.firstName,
          last_name: user.lastName,
          email: user.email,
          password: user.password,
          password_confirmation: user.passwordConfirmation
        }
      });
      $http.post(`${api.url}${api.userModel}`, userObj)
      .then(response => resolve(response))
      .catch(error => reject(error));
    });
  };

  const logIn = (user) => {
    console.log('login firing');
    return $q((resolve, reject) => {
      let loginObj = angular.toJson({
        session: {
          email: user.email,
          password: user.password
        }
      });
      $http.post(`${api.url}${api.userLogIn}`, loginObj)
      .then((userData) => {
        currentUser = userData.data;
        resolve(userData);
      })
      .catch((error) => reject(error));
    });
  };

  const logOut = () => {
    //log out the users
  };

  return {
    signUp,
    logIn,
    logOut
  };
});
