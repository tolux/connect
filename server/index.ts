import express from 'express';
import { Server, ServerOptions } from 'socket.io';
import cors from 'cors';
import { createServer } from 'node:http';
import http from 'http';
import { createLink } from './services.ts';

const app = express();
app.use(cors());

interface CustomServerOptions extends ServerOptions {
  handlePreflightRequest?: (
    req: http.IncomingMessage,
    res: http.ServerResponse
  ) => void;
}
const server = createServer(app);

const IO = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
  ...({
    handlePreflightRequest: (
      req: http.IncomingMessage,
      res: http.ServerResponse
    ) => {
      res.writeHead(200, {
        'Access-Control-Allow-Origin': req.headers.origin || '',
        'Access-Control-Allow-Methods': 'GET,POST',
        'Access-Control-Allow-Headers':
          'Origin, X-Requested-With, Content-Type, Accept, Referer, User-Agent, Host, Authorization',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Max-Age': '86400',
      });
      res.end();
    },
  } as CustomServerOptions),
});

const users = new Map();
// const meetLink = new Map();
// let meetLink: string = '';
let meetLink = '';
const messages: string[] = [];

IO.on('connection', function connection(socket) {
  socket.on('createLink', () => {
    const link = createLink();
    meetLink = link;
    socket.emit('sendLink', meetLink);
  });

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

    IO.to(roomNum).emit('sendAllMess', messages);

    socket.on('disconnect', () => {
      users.delete(userId);
      IO.to(roomNum).emit('userCount', users.size);
      socket.leave(roomNum);
    });
  });
});

// app.post('/create_link' , );

server.listen(3000, function initServer() {
  console.log('server done start ooo');
});
