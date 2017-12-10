'use strict';
let app = angular.module('LivePolling', ['ngRoute']);

app.config(($routeProvider) => {
  $routeProvider
  .when('/', {
    templateUrl: 'views/home.html'
  })
  .when('/login', {
    templateUrl: 'views/login.html'
  });
});
