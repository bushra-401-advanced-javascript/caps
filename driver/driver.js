'use strict';

const net = require('net');
const client = new net.Socket();
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;


client.connect(PORT, HOST, () => {
  console.log('\ndriver is connected**\n**********************\n'); 
  client.on('data', (data) => {
    const event = JSON.parse(data);
    if (event.event === 'pick-up') {
      pickUpLogger(event.payload);
    }
  });
});

client.on('error', (err) => console.log(`Driver Client ERROR:\n ${err.message}`));


function pickUpLogger(payload){
  setTimeout(()=> {
    console.log(`DRIVER: picked up ${payload.orderId}`);
    const message = JSON.stringify({
      event:'on-transit',
      payload:payload,
    });
    client.write(message);
    setTimeout(()=>{
      const message = JSON.stringify({
        event:'delivered',
        payload:payload,
      });
      client.write(message);
      console.log('-----------------------------\n');
    }, 3000);

  }, 1000);
}

module.exports = pickUpLogger;
