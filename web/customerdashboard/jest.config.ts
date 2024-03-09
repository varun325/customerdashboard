export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
      // process `*.tsx` files with `ts-jest`
    },
    roots: ['<rootDir>/src'],
    moduleNameMapper: {
      '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__ mocks __/fileMock.js',
      "^@/$": "<rootDir>/src/",
    },
  };
  