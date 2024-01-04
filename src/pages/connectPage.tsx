import { useContext, useEffect } from 'react';
import MeetingRoom from './meetingRoom';
import WaitRoom from './waitRoom';
import { useRouting } from '@/hooks/routing';

import { AppContextApi, AppContextData } from '@/context';

export default function ConnectPage() {
  const { param } = useRouting();

  const { socket } = useContext(AppContextData);
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

    return userId || dateNum;
  }

  function updateUserCount(userCount: number) {
    setAppData('userCount', userCount);
  }

  useEffect(() => {
    const userId = setUser();

    socket.connect();
    socket.emit('joinRoom', {
      roomNum: 45,
      userId: userId,
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
