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
        resolve(userData.data);
      })
      .catch((error) => reject(error));
    });
  };

  const logOut = () => {
    return $q((resolve, reject) => {
      currentUser = null;
      $http.delete(`${api.url}${api.userLogOut}`)
      .then(() => resolve())
      .catch(error => reject(error));
    });
  };

  const getCurrentUser = () => {
    return currentUser;
  };

  return {
    signUp,
    logIn,
    logOut,
    getCurrentUser
  };
});
