'use strict';

app.factory('userFactory', function($q, $http, api) {

  let currentUserToken = null;
  let currentUserId = null;

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
        email: user.email, password: user.password
      });
      $http.post(`${api.url}${api.userLogIn}`, loginObj)
      .then((userData) => {
        currentUserToken = userData.data.authorization_token;
        currentUserId = userData.data.user_id;
        resolve(userData.data);
      })
      .catch((error) => reject(error));
    });
  };

  const logOut = () => {
    currentUserToken = null;
  };

  const getCurrentUserToken = () => {
    console.log('USER TOKEN IS: ', currentUserToken); // LEAVE THIS FOR TESTING FOR NOW
    return currentUserToken;
  };

  const getCurrentUserId = () => {
    return currentUserId;
  };

  const showAuthorized = () => {
    return new Promise((resolve, reject) => {
      if (currentUserToken) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  };

  return {
    signUp,
    logIn,
    logOut,
    getCurrentUserToken,
    getCurrentUserId,
    showAuthorized
  };
});
