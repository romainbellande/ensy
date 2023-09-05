import { register, init, getLocaleFromNavigator } from 'svelte-i18n';
import { setLocale } from 'yup';

register('en', () => import('./assets/en.json'));

init({
  fallbackLocale: 'en',
  initialLocale: getLocaleFromNavigator()
});

// Yup

const yupBaseTrans = 'common.errors';

setLocale({
  mixed: {
    default: `${yupBaseTrans}.default`,
    required: `${yupBaseTrans}.required`
  },
  string: {
    min: (min) => ({ key: `${yupBaseTrans}.string.min`, values: { min } }),
    max: (max) => ({ key: `${yupBaseTrans}.string.max`, values: { max } }),
    email: `${yupBaseTrans}.string.email`
  }
});
