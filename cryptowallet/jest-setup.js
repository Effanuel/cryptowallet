function mockComponent(name, real = {}) {
  const React = require('react');
  const MockedComponent = class extends React.Component {
    static displayName = real.displayName || name;
    static propTypes = real.propTypes;
    render() {
      return React.createElement(name, this.props);
    }
  };
  for (const prop in real) {
    if (real.hasOwnProperty(prop)) {
      MockedComponent[prop] = real[prop];
    }
  }
  return MockedComponent;
}

require('react-native-gesture-handler/jestSetup');

jest.mock('react-native-navigation', () => require('rnnjs/jest'));

jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

jest.mock('react-native/Libraries/Components/Touchable/TouchableOpacity', () => mockComponent('TouchableOpacity'));

jest.mock('./src/api/apiService', () => {
  const WalletApiService = require('./test/proxy').networkProxy.setNetworkTarget(
    jest.requireActual('./src/api/apiService').WalletApiService,
    require('./test/proxy').tracker,
  );
  return {
    WalletApiService,
  };
});

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str) => str,
    };
  },
}));

const {IgnoredErrors} = require('./test/common-errors');

const recordFailure = (...args) => {
  const message = String(args[0]);
  if (!IgnoredErrors.find((rule) => rule.test(message))) {
    console.debug(...args);
  }
};

jest.spyOn(console, 'warn').mockImplementation(recordFailure);
jest.spyOn(console, 'error').mockImplementation(recordFailure);
