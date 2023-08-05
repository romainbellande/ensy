import { Auth0ProviderOptions, AppState } from '@auth0/auth0-react';
import { useCallback } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

export const useAuthRedirect = () => {
  const navigate = useNavigate();

  return useCallback(
    (appState?: AppState | undefined) => {
      return onRedirectCallbackWithNavigate(navigate)(appState);
    },
    [navigate]
  );
};

const onRedirectCallbackWithNavigate =
  (navigate: NavigateFunction) => (appState?: AppState) => {
    navigate((appState && appState.returnTo) || window.location.pathname);
  };

interface Configuration {
  graphqlEndpoint: string;
  auth: Auth0ProviderOptions;
}

export const configuration: Configuration = {
  graphqlEndpoint: import.meta.env.VITE_GRAPHQL_ENDPOINT,
  auth: {
    domain: import.meta.env.VITE_AUTH_DOMAIN,
    clientId: import.meta.env.VITE_AUTH_CLIENT_ID,
    authorizationParams: {
      redirect_uri: window.location.origin,
      audience: import.meta.env.VITE_AUTH_AUDIENCE,
    },
  },
};
