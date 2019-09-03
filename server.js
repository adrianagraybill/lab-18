'use strict';

const io = require('socket.io')(3001);

io.on('connection', (socket) => {
  console.log('You have connected to Socket!', socket.id);
  socket.on('save', (payload) => {
    socket.broadcast.emit('message', payload);
  });
});

let dispatchEvent = (buffer) => {
  let text = buffer.toString().trim();
  let [event, payload] = text.split(/\s+(.*)/);
  if (allowedEvents.includes(event)){
    let eventPayload = {event, payload};
    for (let socket in socketPool) {
      socketPool[socket].write(JSON.stringify(eventPayload));
    }
  }
  else {
    console.log(`IGNORE ${event}`);
  }
};
