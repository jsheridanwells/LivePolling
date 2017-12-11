'use strict';
let app = angular.module('LivePolling', ['ngRoute']);

// let getAuthorization = (userFactory) => new Promise((resolve, reject) => {
//   userFactory.getCurrentUserToken()
//   .then((token) => {
//     if (token) {
//       console.log('there\'s a token');
//       resolve();
//     } else {
//       console.log('there\'s NO token');
//       reject();
//     }
//   });
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
