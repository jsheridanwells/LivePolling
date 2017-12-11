'use strict';

app.factory('presentationFactory', function($q, $http, api) {

  const getAllPresentations = () => {
    return $q((resolve, reject) => {
      $http.get(`${api.url}${api.presentationsAll}`)
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
