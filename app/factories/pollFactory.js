'use strict';

module.exports = function($q, $http, api) {

  // takes poll data and auth token, takes fields from api const
  // posts to polls resource
  const postNewPoll = (pollObj, token) => {
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

  const getPoll = (pollId, token) => {
    return $q((resolve, reject) => {
      $http({
        method: 'GET',
        url: `${api.url}${api.polls}/${pollId}`,
        headers: {'authorization': token}
      })
      .then(data => resolve(data))
      .catch(error => reject(error));
    });
  };

  const updatePoll = (pollObj, pollId, token) => {
    console.log('poll object', angular.toJson(pollObj));
    return $q((resolve, reject) => {
      $http({
        method:'PATCH',
        url: `${api.url}${api.polls}/${pollId}`,
        headers: {'authorization': token},
        data: angular.toJson(pollObj)
      })
      .then(data => resolve(data))
      .catch(error => reject(error));
    });
  };

  const deletePoll = (pollId, token) => {
    return $q((resolve, reject) => {
      $http({
        method:'DELETE',
        url: `${api.url}${api.polls}/${pollId}`,
        headers: {'authorization': token}
      })
      .then(presentation => resolve(presentation.data))
      .catch(error => reject(error));
    });
  };

  const deleteItem = (itemId, token) => {
    return $q((resolve, reject) => {
      $http({
        method: 'DELETE',
        url: `${api.url}${api.items}/${itemId}`,
        headers: {'authorization': token}
      })
      .then(() => resolve())
      .catch(error => reject(error));
    });
  };

  return {
    postNewPoll,
    getPoll,
    updatePoll,
    deletePoll,
    deleteItem
  };
};
