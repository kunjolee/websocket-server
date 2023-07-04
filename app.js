// socket.io es una implementacion de los websockets (no son los websockets como tal)

require('dotenv').config();

const Server = require('./models/server');


const server = new Server();

server.listen();