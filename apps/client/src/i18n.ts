import { register, init, getLocaleFromNavigator } from 'svelte-i18n';

register('en', () => import('./assets/en.json'));

init({
  fallbackLocale: 'en',
  initialLocale: getLocaleFromNavigator()
});
