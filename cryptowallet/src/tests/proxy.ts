import {createNetworkProxy} from 'influnt/dist/react-native/networkProxy';
import {Tracker} from 'influnt/dist/react-native/types';

export const networkProxy = createNetworkProxy();

export const tracker: Tracker = (key, mocks, logger) => {
  // eslint-disable-next-line no-console
  if (!mocks.length) console.error('No mocks found');

  const matchedMock = mocks.find(({id, params}) => {
    return id === key;
  });

  if (!matchedMock) {
    console.error(
      `No mock defined for request: ${String(key)}:`,
      `\nDefined mocks: `,
      ...mocks.map((mock) => [mock.id, mock.params]),
    );
  }

  return matchedMock?.promise.then((value) => {
    console.log('TRIGGER ME');
    logger(matchedMock.id, matchedMock.params);
    return value;
  });
};
