require('dotenv').config();
const express = require('express');
const app = express();
const { Server } = require('socket.io');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');

const server = http.createServer(app);

app.use(express.json());
app.use(cors());
app.use(routes);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  },
});

io.on('connection', (socket) => {
  socket.on('send_message', (data) => {
    socket.broadcast.emit('receive_message', data);
  });

})

server.listen(process.env.PORT, () => {
  console.log('server at port: ' + process.env.PORT)
});
