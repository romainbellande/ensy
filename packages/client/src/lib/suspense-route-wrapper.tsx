import type { RouteObject } from 'react-router-dom';
import { ThemedSuspense } from '@client/components';

export const suspenseRouteWrapper = (route: RouteObject) =>
  route.element
    ? {
        ...route,
        element: <ThemedSuspense>{route.element}</ThemedSuspense>,
      }
    : route;
