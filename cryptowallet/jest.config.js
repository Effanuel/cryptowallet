module.exports = {
  preset: 'react-native',
  clearMocks: true,
  setupFiles: ['./jest-setup.js'],
  collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}', '!src/**/*.d.ts'],
  testPathIgnorePatterns: ['/node_modules/'],
  transformIgnorePatterns: ['node_modules/(?!react-native|@react-native)'],
  moduleFileExtensions: ['js', 'json', 'jsx', 'node', 'ts', 'tsx'],
  testMatch: ['**/?(*.)(spec).(ts|tsx)'],
};
