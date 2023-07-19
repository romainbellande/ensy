import { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import { Header, SideNav, ThemedSuspense } from '@client/components';
import { routes } from '@client/routes';
import styles from './Layout.module.scss';
import { cn } from '@client/lib/utils';

export const Layout: FC = () => {
  const routeElement = useRoutes(routes);

  return (
    <div>
      <Header />
      <SideNav />
      <div
        className={cn(
          'pt-28 pl-72 min-h-screen flex flex-col w-screen',
          styles.main
        )}
      >
        <ThemedSuspense>{routeElement}</ThemedSuspense>
      </div>
    </div>
  );
};
