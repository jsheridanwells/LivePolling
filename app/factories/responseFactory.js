'use strict';

module.exports = function($q, $http, api) {

  const sendResponse = (itemId) => {
    return $q((resolve, reject) => {
      $http.post(`${api.url}${api.responses}`, angular.toJson({responses: {item_id: itemId}}))
      .then(data => resolve(data))
      .catch(error => reject(error));
    });
  };

};
