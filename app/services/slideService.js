'use strict';

module.exports = function(
    presentationFactory
  ) {

  // takes desired slide number, id of presentatin to modify, user token, and optional redirect url
  // resets slide number of current presentation
  const setSlideNumber = (slideNumber, presentationId, token, url) => {
    console.log('slide number', slideNumber);
    let presentationObj = {presentation: {current_slide: slideNumber}};
    presentationFactory.editPresentation(presentationObj, presentationId, token)
    .then(() => {
      if (url) {
        window.location.href = url;
      }
    })
    .catch(error => console.log(error));
  };

  return { setSlideNumber };

};
