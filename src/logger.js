'use strict';

const io = require('socket.io-client');
const socket = io.connect('http://localhost:3001');

socket.on('message', (payload) => {
  console.log('I have:', payload);
});

socket.on('save', function(data) {
  let payload = JSON.parse(data);
  console.log(`This file has been saved:', ${payload}`);
});

socket.on('error', function() {
  console.log('Oof, there is a problem...');
});
