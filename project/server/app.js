const WebSocket = require('ws');


let wss = new WebSocket.Server({port: 3000});

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log(message.toString());
    wss.broadcast(message);
  });
});

wss.broadcast = function broadcast(msg) {
 console.log(msg);
 wss.clients.forEach(function each(client) {
     client.send(msg);
  });
};
