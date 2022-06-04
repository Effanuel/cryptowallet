import {createNetworkProxy} from 'influnt/dist/react-native/networkProxy';
import {Tracker} from 'influnt/dist/react-native/types';

export const networkProxy = createNetworkProxy();

export const tracker: Tracker = (key, mocks, logger) => {
  if (!mocks.length) {
    console.error('No mocks found');
  }

  const matchedMock = mocks.find(({id}) => {
    return id === key;
  });

  if (!matchedMock) {
    console.error(
      `No mock defined for request: ${String(key)}:`,
      '\nDefined mocks: ',
      ...mocks.map((mock) => [mock.id, mock.params]),
    );
  }

  return matchedMock?.promise.then((value) => {
    logger(matchedMock.id, matchedMock.params);
    return value;
  });
};
