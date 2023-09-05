module.exports = {
  extends: ['custom'],
  overrides: [
    {
      files: ['*.ts'],
      rules: {
        importNotUsedAsValue: 'off',
        '@typescript-eslint/consistent-type-imports': 'off'
      }
    }
  ],
};
