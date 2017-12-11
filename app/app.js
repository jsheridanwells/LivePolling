'use strict';
let app = angular.module('LivePolling', ['ngRoute']);

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
  });
});
