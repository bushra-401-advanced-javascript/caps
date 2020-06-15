'use strict';
//vendor module//

/**
 * * declare store name (in .env)
 * * simulate a new customer order every 5 sec's
 * --> create a fake order obj {storeName, orderId, customerName, adress}
 * --> emit a pick-up event, with the fake order as payload
 * * monitor the system for events
 * --> console log "Thank you!" when a delivered event occurs
 */
const events = require('./events');
// require('./caps');
require('dotenv').config();
let faker = require('faker');

//declaring store name
const store = process.env.STORE_NAME;

generateOrder();

function generateOrder() {
  setTimeout(() => {
    let randomName = faker.name.findName();
    let randomID = faker.random.uuid();
    let randomAddress = faker.fake('{{address.city}}, {{address.stateAbbr}}');
    let order = {
      storeName: store,
      orderId: randomID,
      customerName: randomName,
      address: randomAddress,
    };
    events.emit('pick-up', order);
    generateOrder();
  }, 5000 );
}

events.on('delivered', (payload)=> thankLogger(payload));

function thankLogger() {
  console.log('Thank you!');
}

module.exports = thankLogger;
