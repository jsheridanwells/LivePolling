'use strict';

// creates API constant
// holds all uris and endpoints for api calls and websocket connections
// commenting can toggle development and production urls
module.exports = {
  url: 'http://localhost:3000',
  // url: 'https://ancient-sierra-59888.herokuapp.com',
  ws: 'ws://localhost:3000/cable',
  // ws: 'wss://ancient-sierra-59888.herokuapp.com/cable',
  userModel: '/users',
  userLogIn: '/authenticate',
  presentations: '/presentations',
  broadcast: '/broadcast',
  showPresentation: '/show-presentation',
  next: '/next',
  prev: '/prev',
  polls: '/polls',
  responses: '/respond'
};
