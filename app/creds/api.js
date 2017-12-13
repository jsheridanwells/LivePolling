'use strict';

app.constant('api', {
  url: 'http://localhost:3000',
  // url: 'https://ancient-sierra-59888.herokuapp.com',

  userModel: '/users',
  userLogIn: '/authenticate',

  presentations: '/presentations',
  broadcast: '/broadcast',
  showPresentation: '/show-presentation',

  next: '/next',
  prev: '/prev',

  polls: '/polls'
});
