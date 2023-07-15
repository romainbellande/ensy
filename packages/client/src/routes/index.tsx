import { lazy } from 'react';
import { suspenseRouteWrapper } from '@client/lib/suspense-route-wrapper';
import type { RouteObject } from 'react-router-dom';

const Home = lazy(() => import('@client/pages/Home'))

export const routes: RouteObject[] = [
  {
    path: '/',
    children: [
      {
        path: '',
        element: <Home />
      }
    ]
  }
].map(suspenseRouteWrapper);
