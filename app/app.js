'use strict';

let angular = require('../lib/node_modules/angular');
require('../lib/node_modules/angular-route');
let app = angular.module('LivePolling', ['ngRoute']);

require('./controllers');
require('./creds');
require('./directives');
require('./factories');
require('./services');

// called by ng-routes for restricted views
// resolves true or rejects false depending on existence of user auth token
// resolve authorizes access to views, reject redirects user to /home view
let getAuthorization = (userFactory, $window) => new Promise((resolve, reject) => {
  userFactory.showAuthorized()
  .then((user) => {
    if (user) {
      resolve();
    } else {
      return true;  // TEMPORARILY DISABLED AUTHENTICATION FOR DEVELOPMENT
      // reject();
      // $window.location.href = '/';
    }
  });
});

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
    controller: 'presentationsCtrl',
    resolve: {getAuthorization}
  })
  .when('/presentations/:presentationId', {
    templateUrl: 'views/show-presentation.html',
    controller: 'showPresentationCtrl',
    resolve: {getAuthorization}
  })
  .when('/new-presentation', {
    templateUrl: 'views/new-presentation.html',
    controller: 'newPresentationCtrl',
    resolve: {getAuthorization}
  })
  .when('/new-poll/:presentationId', {
    templateUrl: 'views/new-poll.html',
    controller: 'newPollCtrl',
    resolve: {getAuthorization}
  })
  .when('/show/:presentationId', {
    templateUrl: 'views/show-participant-presentation.html',
    controller: 'participantCtrl'
  })
  .otherwise('/');
});
