'use strict';

let app = require('../../lib/node_modules/angular').module('LivePolling');

app.factory('pollFactory', require('./pollFactory'));
app.factory('presentationFactory', require('./presentationsFactory'));
app.factory('userFactory', require('./userFactory'));
