'use strict';

// creates API constant
// holds all uris and endpoints for api calls and websocket connections
// commenting can toggle development and production urls
module.exports = {
  clientUrl: 'http://localhost:8080/#!',
  show: '/show',
  url: 'http://localhost:3000',
  ws: 'ws://localhost:3000/cable',
  userModel: '/users',
  userLogIn: '/authenticate',
  presentations: '/presentations',
  broadcast: '/broadcast',
  showPresentation: '/show-presentation',
  next: '/next',
  prev: '/prev',
  showResults: '/show-results',
  polls: '/polls',
  items: '/items',
  responses: '/respond'
};
