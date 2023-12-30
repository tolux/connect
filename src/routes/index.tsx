import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { PageLayout } from '../components/layout';
import WaitRoom from '../pages/waiRroom';

export const router = createBrowserRouter([
  {
    element: <PageLayout />,
    children: [
      {
        path: '/',

        element: <App />,
      },
      {
        path: '/room',

        element: <WaitRoom />,
      },
    ],
  },
]);
