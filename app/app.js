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
      reject();
      $window.location.href = '/';
    }
  });
});

app.config(($routeProvider, api) => {
  $routeProvider
  .when('/', {
    templateUrl: 'views/home.html'
  })
  .when('/home', {
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
  .when('/user', {
    templateUrl: 'views/user.html',
    controller: 'editUserCtrl',
    resolve: {getAuthorization}
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
    templateUrl: 'views/poll-form.html',
    controller: 'pollCtrl',
    resolve: {getAuthorization}
  })
  .when('/edit-poll/:presentationId/:pollId', {
    templateUrl: 'views/poll-form.html',
    controller: 'pollCtrl',
    resolve: {getAuthorization}
  })
  .when('/show/:presentationId', {
    templateUrl: 'views/show-participant-presentation.html',
    controller: 'participantCtrl'
  })
  // .otherwise(api.clientUrl);
  .otherwise('/');
});
