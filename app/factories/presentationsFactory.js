'use strict';

module.exports = function($q, $http, api) {

  // takes auth token, takes fields from api const
  // calls presentations#index endpoint
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


  // takes presentation id and auth token, takes fields from api constant
  // gets to presentations resource
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

  // takes presentation data and auth token, takes fields from api constant
  // posts to presentations resource
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

  const editPresentation = (presentationObj, presentationId, token) => {
    console.log('firing', presentationObj);
    return $q((resolve, reject) => {
      $http({
        method: 'PATCH',
        url: `${api.url}${api.presentations}/${presentationId}`,
        headers: {'authorization': token},
        data: angular.toJson(presentationObj)
      })
      .then(presentation => resolve(presentation.data))
      .catch(error => reject(error));
    });
  };

  // takes presentations id and auth token, takes fields from api constant
  // patches presentations#broadcast
  // toggles presentations_broadcasting boolean
  // broadcasting:true makes presentation data available publicly
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

  // takes presentation id and auth token, takes fields from api constant
  // patches presentations#next_slide, increments integer of presentations_current_slide column
  // returned data is transmitted via websocket to change data in show-participant view
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

  // takes presentation id and auth token, takes fields from api constant
  // patches presentations#prev_slide, decrements integer of presentations_current_slide column
  // returned data is transmitted via websocket to change data in show-participant view
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

  // takes presentationId and authToken from presentationsController
  // hits show-results endpoint which disables responding in participant view
  // by sending { responding: false } message via presentations_#:id channel
  const showResults = (presentationId, token) => {
    return $q((resolve, reject) => {
      $http({
        method: 'GET',
        url: `${api.url}${api.showResults}/${presentationId}`,
        headers: {'authorization': token}
      })
      .then(response => resolve(response))
      .catch(error => reject(error));
    });
  };

  // takes presentation id
  // if presentations_broadcasting column is set to true
  // presentation data is made avaiable to user w/o auth
  const showToParticipant = (presentationId) => {
    return $q((resolve, reject) => {
      $http.get(`${api.url}${api.showPresentation}/${presentationId}`)
      .then(presentation => {
        resolve(presentation.data);
      })
      .catch(error => reject(error));
    });
  };

  // takes poll item id, presentation id, poll id and fields from api constant
  // calls post 'respond/:presentation_id/:poll_id' 'responses#add' endpoint
  // adds item to response table w/ selected item id, used to count number of responses by item id
  const sendResponse = (itemId, presentationId, pollId, responseWritten) => {
    return $q((resolve, reject) => {
      $http.post(
        `${api.url}${api.responses}/${presentationId}/${pollId}`,
        angular.toJson({response: {item_id: itemId, written: responseWritten}})
      )
      .then(data => resolve(data))
      .catch(error => reject(error));
    });
  };

  // takes presentation id and auth token, takes api constant
  // calls delete to presentations resource
  // removes presentation from database
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
    editPresentation,
    toggleBroadcasting,
    nextSlide,
    prevSlide,
    showResults,
    showToParticipant,
    sendResponse,
    deletePresentation
  };

};
