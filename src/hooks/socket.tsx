import { SOCKET_URL } from '@/data';
import { useEffect, useRef } from 'react';
import { Socket, io } from 'socket.io-client';

export function useSocket() {
  const socketIo = useRef<Socket | null>(null);

  useEffect(() => {
    socketIo.current = io(SOCKET_URL, {
      transports: ['websocket'],
    });
  }, []);

  return {
    socketIo,
  };
}
