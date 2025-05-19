import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'jsdom',

  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.jest.json' }],
  },

  moduleNameMapper: {
    // ✅ Path alias for "@/..."
    '^@/(.*)$': '<rootDir>/src/$1',

    // ✅ Mock styles
    '\\.(css|less|scss|sass)$': '<rootDir>/jest/cssMock.cjs',
  },

  testEnvironmentOptions: {
    resources: 'usable',
  },

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default config;
