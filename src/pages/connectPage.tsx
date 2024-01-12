import { useContext, useEffect } from 'react';
import MeetingRoom from './meetingRoom';
import WaitRoom from './waitRoom';
import { useRouting } from '@/hooks/routing';
import { AppContextApi, AppContextData } from '@/context/appProvider';

export default function ConnectPage() {
  const { param, goTo, getParamUrl } = useRouting();

  const { socket } = useContext(AppContextData);
  const { setAppData } = useContext(AppContextApi);

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

  function returnToHomePage() {
    setTimeout(() => {
      goTo('/');
    }, 3000);
  }
  function joinRoom(roomId: string | null) {
    const userId = setUser();
    socket.emit('joinRoom', {
      roomNum: roomId,
      userId: userId,
    });
  }

  function isValidLink() {
    const link = getParamUrl('link');
    socket.emit('isValidLink', link);
    socket.on('linkStatus', (status: string) => {
      if (status == 'ok') {
        setAppData('isLoadingMeeting', false);
        joinRoom(link);
      } else {
        returnToHomePage();
        setAppData('meetingMessage', 'Invalid link');
      }
    });
  }

  useEffect(() => {
    isValidLink();
    socket.on('userCount', updateUserCount);
    return () => {
      socket.off('userCount', updateUserCount);
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const display = {
    wait: <WaitRoom />,
    meeting: <MeetingRoom />,
  }[param || 'wait'];

  return <div className="h-full">{display}</div>;
}
