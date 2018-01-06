'use strict';

module.exports = function(api, googleCreds) {

  const makeQr = (presentationId) => {
    let url = `${api.clientUrl}${api.show}/${presentationId}`;
    let qr = new QRious({  // jshint ignore:line
          element: document.getElementById('qr'),
          value: url
        });
    qr.size = 290;
  };

  const makeLink = (presentationId) => {
    let url = `${api.clientUrl}${api.show}/${presentationId}`;

    gapi.client.setApiKey(googleCreds.api);
    gapi.client.load('urlshortener', 'v1',function(){});

    let request = gapi.client.urlshortener.url.insert({
      'resource': {'longUrl': url}
    });

    request.execute((response) => {
      let link = document.getElementById('link');
      link.innerText = response.id;
    });

  };

  return {
    makeQr,
    makeLink
  };

};
