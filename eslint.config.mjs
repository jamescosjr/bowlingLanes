import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        jest: true,
      },
    },
  },
  pluginJs.configs.recommended,
  {
    plugins: ['jest'],
    extends: [
      'plugin:jest/recommended',
    ],
  },
];
