import { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import { Header, SideNav } from '@client/components';
import { routes } from '@client/routes';

const Layout: FC = () => {
  const routeElement = useRoutes(routes);

  return (
    <div>
      <Header />
      <SideNav />
      <div className='pt-24 pl-72'>
        {routeElement}
      </div>
    </div>
  );
};

export default Layout;
