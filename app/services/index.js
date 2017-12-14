'use strict';

let app = require('../../lib/node_modules/angular').module('LivePolling');

app.service('actionCableService', require('./action-cable-service'));
