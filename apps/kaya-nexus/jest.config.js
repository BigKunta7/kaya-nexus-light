/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[jt]sx?$': 'ts-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.css$': 'identity-obj-proxy',
    '\\.(less|scss|sass)$': 'identity-obj-proxy',
    '^@kaya/design-system$': '<rootDir>/../../packages/design-system/src',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.ts',
    '@testing-library/jest-dom'
  ],
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/.next/', '<rootDir>/cypress/'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/_*.{js,jsx,ts,tsx}'
  ],
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95
    },
    // Exige 100% sur le cœur métier
    'src/modules/': {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    },
    // Tolère moins sur les mocks ou legacy (exemple)
    'src/mocks/': {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60
    }
  },
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "src/modules/subsidiaries/index.ts", // Fichier d'exports pur ignoré
    "src/app/", // Ignorer les pages et API Next.js
    "src/app/api/",
    "src/lib/firebase/", // Ignorer les clients Firebase non testés
    "src/lib/supabase/", // Ignorer les clients Supabase non testés
    "src/lib/schemas/", // Ignorer les schémas partagés déjà validés ailleurs
    "src/types/", // Ignorer les types purs
    "src/instrumentation.*\\.ts", // Ignorer instrumentation.ts et instrumentation-client.ts
    "src/i18n\\.ts" // Ignorer i18n
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
};
