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

const users = {};

io.on('connection', (socket) => {
  socket.on("new_user", (data) => {
    users[data.userId] = socket;
  });

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    delete users[socket.id];

    io.emit("user_disconnected", socket.userId);
  });

  socket.on("add_contact", (data) => {
    socket.join(data.roomId);
    users[data.contactId] && users[data.contactId].join(data.roomId);

    socket.to(data.roomId).emit("new_contact");

    socket.leave(data.roomId);
    users[data.contactId] && users[data.contactId].leave(data.roomId);
  });
});

server.listen(process.env.PORT);
