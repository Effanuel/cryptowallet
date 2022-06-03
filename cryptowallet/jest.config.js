module.exports = {
  preset: 'react-native',
  clearMocks: true,
  setupFiles: ['./jest-setup.js'],
  collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}', '!src/**/*.d.ts'],
  testPathIgnorePatterns: ['/node_modules/'],
  transformIgnorePatterns: [
    'node_modules/(?!react-native|@react-native|@wix/react-native|@wix/wix-react-native|@wix/wix-one|@wix/one|wix-one|rnn-|typeorm)',
  ],
  moduleFileExtensions: ['js', 'json', 'jsx', 'node', 'ts', 'tsx'],
  testMatch: ['**/?(*.)(spec|test|it).(ts|tsx|js|jsx)'],
};
