import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import { createServer } from 'node:http';

const app = express();
app.use(cors());

const server = createServer(app);

const IO = new Server(server, {
  cors: {
    origin: '*',
  },
});

IO.on('connection', function connection(socket) {
  console.log('connection user');

  socket.on('disconnect', function disconnect() {
    console.log('disconnected user');
  });
});

IO.listen(4000);

server.listen(3000, function initServer() {
  console.log('server done start ooo');
});
