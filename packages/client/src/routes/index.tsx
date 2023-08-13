import { lazy } from 'react';
import { suspenseRouteWrapper } from '@client/lib/suspense-route-wrapper';
import type { RouteObject } from 'react-router-dom';
import { CreateReferendum } from '@client/pages/Referendums/CreateReferendum';

const Home = lazy(() => import('@client/pages/Home'));
const Referendums = lazy(() => import('@client/pages/Referendums'));

export const routes: RouteObject[] = [
  {
    path: '/',
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'referendums',
        children: [
          {
            path: '',
            element: <Referendums />,
          },
          {
            path: 'create',
            element: <CreateReferendum />,
          },
        ],
      },
    ],
  },
].map(suspenseRouteWrapper);
