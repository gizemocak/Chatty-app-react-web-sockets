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

var colors = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'
];
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
    console.log("server#onMessage", obj)

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