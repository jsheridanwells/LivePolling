'use strict';

app.controller('presentationsCtrl', function($scope, userFactory) {
  let currentUser = userFactory.getCurrentUser();

  console.log('current user is: ', currentUser);

});
