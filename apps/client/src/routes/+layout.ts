import '../app.postcss';
import '../i18n';
import '@/lib/dayjs';
import { waitLocale } from 'svelte-i18n';
import { auth0Init } from '@/lib/auth0';
import { client } from '@/lib/graphql';
import { currentUser } from '@/lib/stores';

export const ssr = false;
export const prerender = false;

export async function load() {
  await auth0Init();

  const { me } = await client.GetMe();
  currentUser.set(me);

  return waitLocale();
}
