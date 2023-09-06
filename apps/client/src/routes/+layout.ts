import '../app.postcss';
import '../i18n';
import '@/lib/dayjs';
import { waitLocale } from 'svelte-i18n';
import { auth0Init } from '@/lib/auth0';
export const ssr = false;
export const prerender = false;

export async function load() {
  await auth0Init();

  return waitLocale();
}
