'use strict';

module.exports = function($q, $http, api) {

  const postNewPoll = (pollObj, token) => {
    console.log('firing here 1');
    return $q((resolve, reject) => {
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
};
