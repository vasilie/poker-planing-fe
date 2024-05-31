const fs = require('fs');
const http = require('http');
const https = require('https');

if (process.env.NODE_ENV === "production") {
  require('dotenv').config();
} else {
  require("dotenv").config({ path: ".env.development" });
}

let server;

if (process.env.NODE_ENV === "production") {
  server = https.createServer({
    key: fs.readFileSync('/etc/letsencrypt/live/www.vasilie.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/www.vasilie.com/fullchain.pem')
  });
} else {
  server = http.createServer();
}

var io = module.exports.io = require("socket.io")(server, { cors: {
  origin: `${process.env.APP_URL}:${process.env.SOCKET_PORT}`,
  methods: ["GET", "POST"],
  }
});

const SocketManager = require('./SocketManager')

io.on('connection', SocketManager)

server.listen(process.env.SOCKET_PORT, ()=> {
  console.log('connected on port: '+ process.env.SOCKET_PORT);
})