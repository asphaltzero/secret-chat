/*
const http = require('http');

class CPort {
    constructor(port) {
        this.isFree = true;
        this.port = port;
    }
}

class ObjectWS {
    constructor() {
        this.ws;
        this.pub_key;
        this.online = false;
        this.check = false;
        this.port;
        this.code;
        this.timer;
    }
}

const hostname = '127.0.0.1';
const port = 3000;

// Генерация списка доступных портов.
let portList = [];
for (let i = 0; i < 128; ++i) {
    portList.push(new CPort(port + 1 + i));
}
// Генерация списка доступных слушателей WebSocket.
let wsList = [];
for (let i = 0; i < 128; ++i) {
    wsList.push(new ObjectWS());
}

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    let nextPort = portList[getNextPort()];
    nextPort.isFree = false;
    res.setHeader('server_port', nextPort.port);
    let nextWS = wsList[getNextWS()];
    nextWS.online = true;
    nextWS.port = nextPort;
    nextWS.code = getNewCode(1000, 9999);
    nextWS.ws = require('socket.io')(nextWS.port);
    //nextWS.ws.listen(nextWS.port);
    nextWS.ws.on('message', (data) => checkMessage.bind(null, nextWS));
    nextWS.timer = setTimeout(stopConnection.bind(nextWS), 10000);
    res.setHeader('server_code', nextWS.code);
    res.end();
});

server.listen(port, hostname);

function stopConnection(wsObject) {
    return;
    wsObject.ws.disconnect(close);
    wsObject.ws.close();
    wsObject.ws = null;
    wsObject.online = false;
    wsObject.pub_key = null;
    wsObject.port.isFree = true;
    wsObject.code = null;
    clearTimeout(wsObject.timer);
    wsObject.timer = null;
    wsObject.check = false;
}

function checkMessage(data, wsObject) {
    console.log('test');
    console.log(data);
    wsObject.check = true;
    clearTimeout(wsObject.timer);
    wsObject.pub_key = JSON.parse(data)['pub_key'];
    if (wsObject.check === false) {
        if (wsObject.code === JSON.parse(data)['code']) {
            wsObject.check = true;
            clearTimeout(wsObject.timer);
            wsObject.pub_key = JSON.parse(data)['pub_key'];
        }
    }
    else {
        for (let i = 0; i < 128; ++i) {
            if (wsList[i].pub_key === JSON.parse(data)['for_pub_key']) {
                wsList[i].ws.socket.send(data);
            }
        }
    }
}

function getNextPort() {
    for (let i = 0; i < 128; ++i) {
        if (portList[i].isFree === true) return i;
    }
    return -1;
}

function getNewCode(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getNextWS() {
    for (let i = 0; i < 128; ++i) {
        if (wsList[i].online === false) return i;
    }
    return -1;
}
*/
