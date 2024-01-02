import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import { createServer } from 'node:http';

const app = express();
app.use(cors());

const server = createServer(app);

const IO = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
  handlePreflightRequest: (req, res) => {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': req.headers.origin,
      'Access-Control-Allow-Methods': 'GET,POST',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept, Referer, User-Agent, Host, Authorization',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Max-Age': 86400,
    });
    res.end();
  },
});

const users = new Set();

IO.on('connection', function connection(socket) {
  socket.on('joinRoom', function joinRoom(roomNum) {
    socket.join(roomNum);
    users.add(socket.id);
    IO.to(roomNum).emit('userCount', users.size);

    socket.on('disconnect', function disconnect() {
      users.delete(socket.id);
      IO.to(roomNum).emit('userCount', users.size);
      socket.leave(roomNum);
    });
  });
});

// IO.listen(3000);

server.listen(3000, function initServer() {
  console.log('server done start ooo');
});
