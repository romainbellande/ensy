import { Auth0Client } from '@auth0/auth0-spa-js';
import { redirect } from '@sveltejs/kit';

import {
  PUBLIC_AUTH_AUDIENCE,
  PUBLIC_AUTH_CLIENT_ID,
  PUBLIC_AUTH_DOMAIN,
  PUBLIC_HOST
} from '$env/static/public';

export const auth0 = new Auth0Client({
  domain: PUBLIC_AUTH_DOMAIN,
  clientId: PUBLIC_AUTH_CLIENT_ID,

  authorizationParams: {
    redirect_uri: PUBLIC_HOST,
    audience: PUBLIC_AUTH_AUDIENCE
  }
});

export const auth0Init = async () => {
  const isAuthenticated = await auth0.isAuthenticated();

  if (isAuthenticated) {
    return;
  }

  const { search, pathname } = window.location;
  const shouldParseResult = search.includes('code=') && search.includes('state=');

  if (shouldParseResult) {
    const { appState } = await auth0.handleRedirectCallback().catch((err) => {
      throw new Error(err);
    });

    if (appState?.targetUrl) {
      throw redirect(307, appState?.targetUrl);
    }

    window.history.replaceState({}, document.title, '/');
  } else {
    return auth0.loginWithRedirect({ appState: { targetUrl: pathname + search } });
  }
};
