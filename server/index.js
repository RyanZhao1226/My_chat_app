import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`Connected: ${socket.id}`);

  // Creative addition
  socket.on('join room', ({ room, username }) => {
    socket.join(room);
    socket.data.username = username;
    socket.data.room = room;

    const joinMessage = {
      system: true,
      text: `${username} joined the room`,
      time: new Date().toLocaleTimeString(),
    };

    socket.to(room).emit('chat message', joinMessage);
    console.log(`${username} joined room ${room}`);
  });

  socket.on('chat message', ({ room, ...data }) => {
    console.log(`[room ${room}] ${data.time} - ${data.user}: ${data.text}`);
    io.to(room).emit('chat message', data);
  });

  socket.on('leave room', () => {
    const { room, username } = socket.data;
    if (room) {
      socket.leave(room);
      socket.to(room).emit('chat message', {
        system: true,
        text: `${username} left the room`,
        time: new Date().toLocaleTimeString(),
      });
      console.log(`${username} left room ${room}`);
    }
  });

  socket.on('disconnect', () => {
    const { room, username } = socket.data || {};
    if (room && username) {
      socket.to(room).emit('chat message', {
        system: true,
        text: `${username} disconnected`,
        time: new Date().toLocaleTimeString(),
      });
    }
    console.log(`Disconnected: ${socket.id}`);
  });
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});