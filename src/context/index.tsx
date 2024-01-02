import { TChildrenProp } from '@/@types/app.types';
import { createContext } from 'react';
import io from 'socket.io-client';

const URL =
  process.env.NODE_ENV == 'production'
    ? window.location
    : 'http://localhost:3000';

const socketIO = io(URL, {
  transports: ['websocket'],
});

export const SocketContext = createContext(socketIO);

export function SocketProvider({ children }: TChildrenProp) {
  return (
    <SocketContext.Provider value={socketIO}>{children}</SocketContext.Provider>
  );
}
