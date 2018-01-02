'use strict';

let app = require('../../lib/node_modules/angular').module('LivePolling');

app.controller('navCtrl', require('./navCtrl'));
app.controller('pollCtrl', require('./pollCtrl'));
app.controller('newPresentationCtrl', require('./newPresentationCtrl'));
app.controller('participantCtrl', require('./participantCtrl'));
app.controller('presentationsCtrl', require('./presentationsCtrl'));
app.controller('showPresentationCtrl', require('./showPresentationCtrl'));
app.controller('userCtrl', require('./userCtrl'));
