'use strict';
let angular = require('../lib/node_modules/angular');
let angularRoute = require('../lib/node_modules/angular-route');

let app = angular.module('LivePolling', ['ngRoute']);

// app.config(($routeProvider) => {
//   $routeProvider
//   .when('/', {
//     templateUrl: 'views/test.html'
//   });
// });

module.exports = app;
