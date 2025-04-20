module.exports = {
  extends: [
    'next',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended'
  ],
  overrides: [
    {
      files: ['apps/kaya-nexus/src/components/**/*.tsx'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            patterns: [
              {
                group: ['../../components/contexts/*', '../../../components/contexts/*'],
                message: "Importer les contextes UNIQUEMENT depuis '../../contexts/...' !"
              }
            ]
          }
        ]
      }
    }
  ]
};
