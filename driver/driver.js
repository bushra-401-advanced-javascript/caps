'use strict';

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const io = require('socket.io-client');

const socket = io.connect(`http://${HOST}:${PORT}/caps`);

socket.on('pick-up', payload => {
  setTimeout(() => {
    console.log(`\nDRIVER: picked up ${payload.orderId}\n`);
    socket.emit('on-transit', payload);
  }, 2000);

  setTimeout(() => {
    console.log(`\ndelivered: ${payload.orderId}\n`);
    socket.emit('delivered', payload);
  });
});

