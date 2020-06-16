'use strict';
//global event pool//

const events = require('events');
const eventsEmitter = new events();

module.exports = eventsEmitter;

