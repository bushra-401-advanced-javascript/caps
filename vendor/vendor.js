'use strict';

require('dotenv').config();
const storeName = process.env.STORE_NAME;
const faker = require('faker');
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const io = require('socket.io-client');

const socket = io.connect(`http://${HOST}:${PORT}/caps`);

socket.emit('join', storeName);

socket.on('delivered', payload => {
  console.log(`\nThank you for delivering: ${payload.orderId}\n`);
});

setInterval(() => {
  let randomName = faker.name.findName();
  let randomID = faker.random.uuid();
  let randomAddress = faker.fake('{{address.city}}, {{address.stateAbbr}}');
  let deliveryOrder = {
    storeName: storeName,
    orderId: randomID,
    customerName: randomName,
    address: randomAddress,
  }
  socket.emit('pick-up', deliveryOrder);
}, 5000);

