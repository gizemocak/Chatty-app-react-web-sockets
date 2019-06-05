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
    // console.log("type", obj.type)
    obj.id = uuidv4()
    obj.type = obj.type === 'postNotification' ? 'incomingNotification' : 'incomingMessage'
    console.log("server#onMessage", obj)
    //console.log(`User${obj.data.username} said ${obj.data.content}`);
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
  console.log(users)
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
    console.log(users)
    //broadcast the number of clients when a new client disconnects
    wss.clients.forEach(client => {
      client.send(JSON.stringify(users));
    });
  })
})