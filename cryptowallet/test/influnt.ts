import {configureInflunt, spyModule} from 'influnt/dist/react-native';
import {ComponentSettings, HocFacadeConfig} from 'influnt/dist/react-native/types';
import {WalletApiService} from '../src/api/apiService';
import {addProviders} from '../src/screens/wrappers';
import {Navigation} from 'react-native-navigation';
import {networkProxy} from './proxy';

type InferProps<T> = T extends React.ComponentType<infer Props> ? Props : never;

const navigationSpy = spyModule('navigation', {
  factory: (logger) => {
    //@ts-expect-error
    jest.spyOn(Navigation, 'push').mockImplementation((args, layout) => {
      logger({['push']: [layout.component?.name, layout.component?.passProps]});
      return;
    });
  },
});

const createRenderer = configureInflunt({
  spyModules: [navigationSpy],
  networkProxy,
});

export const createMainRenderer = <C extends React.ComponentType<InferProps<C>>>(
  component: C,
  componentSettings: ComponentSettings<InferProps<C>, void> = {},
) => {
  const element = addProviders(component, {api: () => new WalletApiService()});

  return createRenderer(element, {
    ...componentSettings,
    passProps: {...componentSettings.passProps, componentId: 'componentId'},
  });
};
