import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { PageLayout } from '../components/layout';

import { CONNECT_ROOM_URL } from '@/data';
import ConnectPage from '@/pages/connectPage';

export const router = createBrowserRouter([
  {
    element: <PageLayout />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/' + CONNECT_ROOM_URL,
        element: <ConnectPage />,
      },
    ],
  },
]);
