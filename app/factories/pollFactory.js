'use strict';

app.factory('pollFactory', function($q, $http, api) {

  const postNewPoll = (pollObj, token) => {
    console.log('firing here 1');
    return $q((resolve, reject) => {
      console.log('firing here 2');
      console.log('endpoint ', `${api.url}${api.polls}`);
      console.log('post object ', angular.toJson(pollObj));
      $http({
        method:'POST',
        url: `${api.url}${api.polls}`,
        headers: {'authorization': token},
        data: angular.toJson(pollObj)
      })
      .then(data => resolve(data))
      .catch(error => reject(error));
    });
  };

  return {
    postNewPoll
  };
});
