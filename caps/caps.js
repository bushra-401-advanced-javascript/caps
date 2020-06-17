'use strict';

const PORT = process.env.PORT || 3000;
const io = require('socket.io')(PORT);

io.on('connection', socket => {
  console.log(`\nThe server is up on PORT ${PORT}\nCORE ${socket.id}\n*******************************\n\n`);
});

//caps namespace
const caps = io.of('/caps');

caps.on('connection', socket => {
  console.log('***Connected***', socket.id);
  socket.on('join', room => {
    console.log(`Registered As: ${room}`);
    socket.join(room);
  });

  socket.on('pick-up', payload => {
    logIt('pick-up', payload);
    caps.emit('pick-up', payload);
  });

  socket.on('on-transit', payload => {
    logIt('on-transit', payload);
    caps.to(payload.storeName).emit('on-transit', payload);
  });

  socket.on('delivered', payload => {
    logIt('delivered', payload);
    caps.to(payload.storeName).emit('delivered', payload);
  });

});

function logIt(event, payload) {
  let time = new Date().toISOString();
  console.log({time, event, payload});
}

