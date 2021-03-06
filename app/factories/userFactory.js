'use strict';

module.exports = function($q, $http, api, $rootScope) {

  // stores user, id and user auth token
  $rootScope.currentUser = null;
  let currentUserToken = null;
  let currentUserId = null;

  // takes in user object
  // calls post :users resource
  // adds new user to database
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

  // takes in user object (email and password fields)
  // calls post to :authentication resource
  // creates a new use auth token
  // populates user token and user id variables
  const logIn = (user) => {
    return $q((resolve, reject) => {
      let loginObj = angular.toJson({
        email: user.email, password: user.password
      });
      $http.post(`${api.url}${api.userLogIn}`, loginObj)
      .then((userData) => {
        $rootScope.currentUser = {
          firstName: userData.data.first_name,
          lastName: userData.data.last_name,
          email: userData.data.email
        };
        currentUserToken = userData.data.authorization_token;
        currentUserId = userData.data.user_id;
        resolve(userData.data);
      })
      .catch((error) => reject(error));
    });
  };

  const updateUser = (user, userId, token) => {
    let userObj = {
      users: {
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email
      }
    };
    return $q((resolve, reject) => {
      $http({
        method: 'PATCH',
        url: `${api.url}${api.userModel}/${userId}`,
        headers: {'authorization': token},
        data: angular.toJson(userObj)
      })
      .then(userData => {
        $rootScope.currentUser = {
          firstName: userData.data.first_name,
          lastName: userData.data.last_name,
          email: userData.data.email
        };
        resolve($rootScope.currentUser);
      })
      .catch(error => reject(error));
    });
  };

  // destroys current user token
  const logOut = () => {
    currentUserToken = null;
  };

  // returns current user o other controllers
  const getCurrentUser = () => {
    return $rootScope.currentUser;
  };

  // returns current user token to other controllers
  const getCurrentUserToken = () => {
    return currentUserToken;
  };

  // returns current user id to other controllers
  const getCurrentUserId = () => {
    return currentUserId;
  };

  // called from app routes
  // resolves true or false depending on existence of user auth token
  // used by ng-route to redirect to home if user is not authorized
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
    updateUser,
    getCurrentUser,
    getCurrentUserToken,
    getCurrentUserId,
    showAuthorized
  };
};
