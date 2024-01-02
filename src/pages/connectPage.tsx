import { useContext, useEffect } from 'react';
import MeetingRoom from './meetingRoom';
import WaitRoom from './waitRoom';
import { useRouting } from '@/hooks/routing';

import { AppContextApi, AppContextData } from '@/context';

export default function ConnectPage() {
  const { param } = useRouting();

  const { socket, userName } = useContext(AppContextData);
  const { setAppData } = useContext(AppContextApi);

  function send() {
    socket.emit('onMessaging', { message: 'tolu' });
  }
  function setUser() {
    const userId = localStorage.getItem('userId');

    const dateNum = +Date.now() + '';
    if (!userId) {
      localStorage.setItem('userId', dateNum);
    }

    setAppData('userName', userId || dateNum);
  }

  function updateUserCount(userCount: number) {
    setAppData('userCount', userCount);
  }

  useEffect(() => {
    setUser();

    socket.connect();
    socket.emit('joinRoom', {
      roomNum: 45,
      userId: userName,
    });
    socket.on('userCount', updateUserCount);
    return () => {
      socket.off('userCount', updateUserCount);
      socket.disconnect();
    };
  }, []);
  const display = {
    wait: <WaitRoom />,
    meeting: <MeetingRoom />,
  }[param || 'wait'];

  return (
    <div className="h-full">
      <button onClick={send}>send</button>
      {display}
    </div>
  );
}
