'use strict';
let app = angular.module('LivePolling', ['ngRoute']);

// let getAuthorization = (userFactory) => new Promise((resolve, reject) => {
//   userFactory.getCurrentUserToken()
//   .then((token) => token ? resolve() : reject())
//   .catch(error => console.log('error from getAuthoriation ', error));
// });

app.config(($routeProvider) => {
  $routeProvider
  .when('/', {
    templateUrl: 'views/home.html'
  })
  .when('/signup', {
    templateUrl: 'views/signup.html',
    controller: 'userCtrl'
  })
  .when('/login', {
    templateUrl: 'views/login.html',
    controller: 'userCtrl'
  })
  .when('/presentations', {
    templateUrl: 'views/presentations.html',
    controller: 'presentationsCtrl'
    // resolve: {getAuthorization}
  })
  .otherwise('/');
});
