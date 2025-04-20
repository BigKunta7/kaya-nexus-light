module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }]
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.css$': 'identity-obj-proxy',
    '\\.(less|scss|sass)$': 'identity-obj-proxy',
    '^@kaya/design-system$': '<rootDir>/../../packages/design-system/src',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/.next/', '<rootDir>/cypress/'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/_*.{js,jsx,ts,tsx}'
  ],
  coverageThreshold: {
    global: {
      statements: 50,
      branches: 50,
      functions: 50,
      lines: 50
    }
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testMatch: ['**/__tests__/**/*.(ts|tsx|js|jsx)', '**/?(*.)+(spec|test).(ts|tsx|js|jsx)'],
};
