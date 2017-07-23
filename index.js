"use strict";

const express = require('express');
const bodyParser = require('body-parser')


const app = express();

// Run server to listen on port 3000.
const server = app.listen(3000, () => {
  console.log('listening on *:3000');
});

const io = require('socket.io')(server);


app.use(bodyParser.urlencoded({ extended: false } ));
app.use(express.static('static'));
// parse application/json
app.use(bodyParser.json());
 
// Set socket.io listeners.
io.on('connection', (socket) => {
  //console.log('a user connected');
 
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
 
// Set Express routes.
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});


// Set Express routes.
app.post('/events', (req, res) => {
   
   console.log(JSON.stringify(req.body));   
   
   let groupName = req.body.groupName;
   let eventName = req.body.eventName;
   
   io.sockets.emit('event', { groupName: groupName, evenType: eventName });
   
   console.log('Event received:' + eventName );

   
  res.send('Event received:' + eventName);
});