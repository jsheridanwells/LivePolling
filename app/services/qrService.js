'use strict';

module.exports = function(api) {
  const makeQr = (presentationId) => {
    console.log('firing');
    let url = `${api.clientUrl}${api.show}/${presentationId}`;
    let qr = new QRious({  // jshint ignore:line
          element: document.getElementById('qr'),
          value: url
        });
    qr.size = 290;
    let link = document.getElementById('link');
    link.innerText = url;
  };
  return { makeQr };
};
