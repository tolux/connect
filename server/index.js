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

const users = new Map();
const messages = [];

IO.on('connection', function connection(socket) {
  socket.on('joinRoom', ({ roomNum, userId }) => {
    console.log(roomNum, userId);
    socket.join(roomNum);
    if (!users.has(userId)) {
      users.set(userId, socket.id);
    }
    IO.to(roomNum).emit('userCount', users.size);

    socket.on('onMessaging', (mess) => {
      messages.push(mess);
      console.log('checking');
      IO.to(roomNum).emit('sendMess', messages);
    });

    socket.on('disconnect', () => {
      users.delete(userId);
      IO.to(roomNum).emit('userCount', users.size);
      socket.leave(roomNum);
    });
  });
});

server.listen(3000, function initServer() {
  console.log('server done start ooo');
});
