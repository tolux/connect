import { useEffect, useState } from 'react';
import MeetingRoom from './meetingRoom';
import WaitRoom from './waitRoom';
import { useRouting } from '@/hooks/routing';
import { io } from 'socket.io-client';
import { SOCKET_URL } from '@/data';

export default function ConnectPage() {
  const { param } = useRouting();
  const [userCount, setUserCount] = useState(0);

  function updateUserCount(userCount: number) {
    setUserCount(userCount);
  }

  useEffect(() => {
    const socket = io(SOCKET_URL, {
      transports: ['websocket'],
    });
    socket.emit('joinRoom', 45);
    socket.on('userCount', updateUserCount);

    return () => {
      socket.off('userCount', updateUserCount);
      socket.disconnect();
    };
  }, []);

  const display = {
    wait: <WaitRoom userCount={userCount} />,
    meeting: <MeetingRoom />,
  }[param || 'wait'];

  return <div className="h-full">{display}</div>;
}
