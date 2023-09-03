import '../app.postcss';
import '../i18n';
import { waitLocale } from 'svelte-i18n';
export const ssr = false;
export const prerender = false;

export async function load() {
  return waitLocale();
}
