require('dotenv').config();
const express = require('express');
const app = express();
const { Server } = require('socket.io');
const cors = require('cors');
const routes = require('./routes');

const server = require('http').createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: 'true',
    methods: ['GET', 'POST'],
  },
});

app.use(cors({ origin: 'http://localhost:3000', credentials: 'true' }));
app.use(express.json());
app.use(routes);

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
});

server.listen(process.env.PORT, () => {
  console.log('server listening on port: ' + process.env.PORT);
});
