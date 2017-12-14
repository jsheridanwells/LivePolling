'use strict';

let app = require('../../lib/node_modules/angular').module('LivePolling');

app.constant('api', require('./api.js'));
