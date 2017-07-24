"use strict";

const express = require('express');
const bodyParser = require('body-parser')
const cons = require('consolidate')

const app = express();

console.log(process.argv);

var port = process.argv[2] || 3000;
var appName = process.argv[3] || "app-A";
console.log("appName:" + appName);


// Run server to listen on port 3000.
const server = app.listen(port, () => {
  console.log('listening on *:' + port);
});

const io = require('socket.io')(server);


app.use(bodyParser.urlencoded({ extended: false } ));
app.use(express.static('static'));
// parse application/json
app.use(bodyParser.json());
//assign the mustache engine to .html files
app.engine('html', cons.mustache);
//set .html as default extension
app.set("view engine", 'html');
app.set("views", __dirname + '/views');
 
 
// Set socket.io listeners.
io.on('connection', (socket) => {
  //console.log('a user connected');
 
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
 
// Set Express routes.
app.get('/', (req, res) => {
  //res.sendFile(__dirname + '/views/index.html');
  var viewData = {'appName': appName};
  res.render('index',viewData);
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