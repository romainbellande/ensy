import { FC, useMemo } from 'react';
import { useRoutes } from 'react-router-dom';
import { Header, SideNav, ThemedSuspense } from '@client/components';
import { routes } from '@client/routes';
import styles from './Layout.module.scss';
import { cn } from '@client/lib/utils';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { ErrorBoundary } from 'react-error-boundary';
import { Page } from '../Page';

const LayoutBase: FC = () => {
  const routeElement = useRoutes(routes);
  const { error, getAccessTokenSilently } = useAuth0();

  useMemo(async () => {
    const token = await getAccessTokenSilently();
    console.log('token :>> ', token);
  }, [getAccessTokenSilently]);

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

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
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <ThemedSuspense>
            <Page>{routeElement}</Page>
          </ThemedSuspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export const Layout = withAuthenticationRequired(LayoutBase);
