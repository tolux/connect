import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { PageLayout } from '../components/layout';
import WaitRoom from '../pages/waitRoom';
import MeetingRoom from '@/pages/meetingRoom';
import { MEET_ROOM_URL, WAIT_ROOM_URL } from '@/data';

export const router = createBrowserRouter([
  {
    element: <PageLayout />,
    children: [
      {
        path: '/',

        element: <App />,
      },
      {
        path: WAIT_ROOM_URL,

        element: <WaitRoom />,
      },
      {
        path: MEET_ROOM_URL,

        element: <MeetingRoom />,
      },
    ],
  },
]);
