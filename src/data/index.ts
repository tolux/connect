export const WAIT_ROOM_URL = '/wait-room';
export const MEET_ROOM_URL = '/meet-room';
export const CONNECT_ROOM_URL = '/connect-room';

export const SOCKET_URL =
  process.env.NODE_ENV == 'production'
    ? window.location
    : 'http://localhost:3000';
