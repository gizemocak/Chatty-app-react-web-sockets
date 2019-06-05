// server.js
const express = require('express');
const SocketServer = require('ws').Server;
//uuid generator
const uuidv4 = require('uuid/v4');


// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({
  server
});

// When a connection is established
wss.on('connection', (ws) => {
  console.log('Client connected');

  //sending data
  ws.on('open', function open() {
    ws.send('You are connected');
  });

  // When data is received
  ws.on('message', function incoming(data) {
    const obj = JSON.parse(data)
    obj.id = uuidv4()
    obj.type = "incomingMessage"
    console.log(obj)
    console.log(`User${obj.data.username} said ${obj.data.content}`);

    //broadcasting to clients
    wss.clients.forEach(client => {
      client.send(JSON.stringify(obj));
    });
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});