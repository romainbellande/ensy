import { lazy } from 'react';
import { suspenseRouteWrapper } from '@client/lib/suspense-route-wrapper';
import type { RouteObject } from 'react-router-dom';

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
        element: <Referendums />,
      },
    ],
  },
].map(suspenseRouteWrapper);
