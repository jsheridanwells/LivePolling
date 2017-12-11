'use strict';

app.factory('presentationFactory', function($q, $http, api) {

  const getAllPresentations = (token) => {
    return $q((resolve, reject) => {
      $http({
        method: 'GET',
        url: `${api.url}${api.presentationsAll}`,
        headers: {'authorization': token}
        })
      .then(presentations => {
        resolve(presentations.data);
      })
      .catch(error => reject(error));
    });
  };

  return {
    getAllPresentations
  };

});
