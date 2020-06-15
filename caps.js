'use strict';
//main hub app//
//pub => fires (emits) events
/**
 * * manages the state of every package
 * --> ready for pick-up
 * --> in transite
 * --> delivered
 * * logs every event to the console with 
 * --> a timestamp
 * --> the event payload
 */

const events = require('./events');
require('./vendor');
require('./driver');

//managing package states
events.on('pick-up', (payload)=> logger('pickup', payload));
events.on('on-transit', (payload)=> logger('in-transit', payload));
events.on('delivered', (payload)=> logger('delivered', payload));

function logger(event, payload){
  const time = new Date();
  console.log({event, time, payload});
}

module.exports = logger;
