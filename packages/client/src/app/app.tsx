import { Route, Routes } from 'react-router-dom';
import { Layout } from '@client/components';
import { Auth0Provider } from '@auth0/auth0-react';
import { configuration, useAuthRedirect } from '../configuration';
const { auth } = configuration;

export function App() {
  const onRedirectCallback = useAuthRedirect();

  return (
    <Auth0Provider {...auth} onRedirectCallback={onRedirectCallback}>
      <Routes>
        <Route path="/*" element={<Layout />} />
      </Routes>
    </Auth0Provider>
  );
}

export default App;
