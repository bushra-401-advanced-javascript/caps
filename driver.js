'use strict';
//drivers module//

/**
 * * monitore the system for events
 * * on pick-up event:-
 * --> after 1 sec. :
 *  - console log ("Driver picked-up <order_Id>.")
 *  - emit on-transite event with the received payload
 * --> after 3 sec's:
 *  - console log "Delivered!"
 *  - emit a delivered event with the same payload (received payload)
 */

const events = require('./events');
// require('./caps');

//monitoring delivery events
events.on('pick-up', pickUpLogger);


function pickUpLogger(payload){
  setTimeout(() => {
    console.log(`DRIVER: picked up ${payload.orderId}`);
    events.emit('in-transit', payload);
    setTimeout(() => {
      events.emit('delivered', payload);
    }, 3000);

  }, 1000);
}

module.exports = pickUpLogger;



