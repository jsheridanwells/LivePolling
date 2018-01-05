'use strict';

module.exports = function(api) {
  const makeQr = (presentationId) => {
    let qr = new QRious({
          element: document.getElementById('qr'),
          value: `${api.clientUrl}${api.show}/${presentationId}`
        });
  };
  return { makeQr };
};
