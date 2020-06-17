'use strict';

require('dotenv').config();
const storeName = process.env.STORE_NAME;
const faker = require('faker');
const net = require('net');
const client = new net.Socket();
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;


// client.connect(PORT, HOST, () => {
//   console.log('\nvendor is connected**\n**********************\n');
//   generateOrder();
//   client.on('data', (data) => {
//     const event = JSON.parse(data);
//     if (event.event === 'delivered') {
//       thankLogger();
//     }
//   })
// });


client.on('error', (err) => console.log('Vendor ERROR:\n ', err.message));

function generateOrder(){
  setTimeout(()=> {
    let randomName = faker.name.findName();
    let randomID = faker.random.uuid();
    let randomAddress = faker.fake('{{address.city}}, {{address.stateAbbr}}');
    let order = {
      storeName: storeName,
      orderId: randomID,
      customerName: randomName,
      address: randomAddress,
    };
    const message = JSON.stringify({
      event:'pick-up',
      payload:order
    });
    client.write(message);
    generateOrder();
  }, 5000 );
}

function thankLogger(){
    console.log('-----------------\nThank you!\n-----------------\n');
}

module.exports = thankLogger;
