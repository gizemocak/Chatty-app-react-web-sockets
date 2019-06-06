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

var colors = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'];

// When a connection is established
wss.on('connection', (ws) => {
  console.log('Client connected');
  //Send a random color to the connected client
  const randomColor = colors[Math.floor(Math.random() * colors.length)]
  const colorObj = {
    type: "usercolor",
    color: randomColor
  }
  ws.send(JSON.stringify(colorObj));

  // When data is received
  ws.on('message', function incoming(data) {
    const obj = JSON.parse(data)
    obj.id = uuidv4()
    obj.type = obj.type === 'postNotification' ? 'incomingNotification' : 'incomingMessage'
    //broadcasting to clients
    wss.clients.forEach(client => {
      client.send(JSON.stringify(obj));
    });
  });

  //broadcast the number of clients when a new client connects
  let users = {
    type: "usercount",
    users: wss.clients.size
  }
  wss.clients.forEach(client => {
    client.send(JSON.stringify(users));
  });
  //When user disconnects
  ws.on('close', () => {
    console.log('Client disconnected')
    let users = {
      type: "usercount",
      users: wss.clients.size
    }
    //broadcast the number of clients when a new client disconnects
    wss.clients.forEach(client => {
      client.send(JSON.stringify(users));
    });
  })
})