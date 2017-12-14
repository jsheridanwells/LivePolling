'use strict';

module.exports = function($q, $http, api) {

  const getAllPresentations = (token) => {
    return $q((resolve, reject) => {
      $http({
        method: 'GET',
        url: `${api.url}${api.presentations}`,
        headers: {'authorization': token}
        })
      .then(presentations => resolve(presentations.data))
      .catch(error => reject(error));
    });
  };

  const getPresentation = (presentationId, token) => {
    return $q((resolve, reject) => {
      $http({
        method: 'GET',
        url: `${api.url}${api.presentations}/${presentationId}`,
        headers: {'authorization': token}
      })
      .then(presentation => resolve(presentation.data))
      .catch(error => reject(error));
    });
  };

  const postPresentation = (presentationObj, token) => {
    return $q((resolve, reject) => {
      $http({
        method:'POST',
        url: `${api.url}${api.presentations}`,
        headers: {'authorization': token},
        data: angular.toJson(presentationObj)
      })
      .then(data => resolve(data))
      .catch(error => reject(error));
    });
  };

  const toggleBroadcasting = (presentationId, token) => {
    return $q((resolve, reject) => {
      $http({
        method: 'PATCH',
        url: `${api.url}${api.broadcast}/${presentationId}`,
        headers: {'authorization': token}
      })
      .then(presentation => resolve(presentation.data))
      .catch(error => reject(error));
    });
  };

  const nextSlide = (presentationId, token) => {
    return $q((resolve, reject) => {
      $http({
        method: 'PATCH',
        url: `${api.url}${api.next}/${presentationId}`,
        headers: {'authorization': token}
      })
      .then(presentation => {
        resolve(presentation.data);
      })
      .catch(error => reject(error));

    });
  };

  const prevSlide = (presentationId, token) => {
    return $q((resolve, reject) => {
      $http({
        method: 'PATCH',
        url: `${api.url}${api.prev}/${presentationId}`,
        headers: {'authorization': token}
      })
      .then(presentation => resolve(presentation.data))
      .catch(error => reject(error));

    });
  };

  const showToParticipant = (presentationId) => {
    return $q((resolve, reject) => {
      $http.get(`${api.url}${api.showPresentation}/${presentationId}`)
      .then(presentation => {
        resolve(presentation.data);
      })
      .catch(error => reject(error));
    });
  };

  const deletePresentation = (presentationId, token) => {
    return $q((resolve, reject) => {
      $http({
        method: 'DELETE',
        url: `${api.url}${api.presentations}/${presentationId}`,
        headers: {'authorization': token}
      })
      .then(data => resolve(data))
      .catch(error => reject(error));
    });
  };

  return {
    getAllPresentations,
    getPresentation,
    postPresentation,
    toggleBroadcasting,
    nextSlide,
    prevSlide,
    showToParticipant,
    deletePresentation
  };

};
