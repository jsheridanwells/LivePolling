'use strict';

let app = require('../../lib/node_modules/angular').module('LivePolling');
app.service('responseTallyService', require('./responseTallyService'));
app.service('stringService', require('./stringService'));
app.service('errorService', require('./errorService'));
app.service('slideService', require('./slideService'));
app.service('qrService', require('./qrService'));
