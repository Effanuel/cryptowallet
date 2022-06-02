import hoistNonReactStatics from 'hoist-non-react-statics';
import React from 'react';
import {Provider} from 'react-redux';
import {WalletApiService} from '../redux/api/apiService';
import {AppStore} from '../redux/configureStore';
import {AppContext} from './context';

export interface System {
  store: () => AppStore;
  api: () => WalletApiService;
}

interface LifecycleMethods {
  shouldDismissModal?: () => boolean;
  onRegainConnectivity?: () => void;
}

interface ReactNavigationProps {
  componentId: string;
  registerLifecycleMethods?: (methods: LifecycleMethods) => void;
}

export function addProviders<T>(Component: React.ComponentType<T>, system: System): React.ComponentType<T> {
  console.log(system, 123);
  function ProviderWrapper(props: T & ReactNavigationProps) {
    const {componentId} = props;

    const context: AppContext = React.useMemo(() => {
      return {
        componentId,
        apiService: system.api(),
      };
    }, [componentId]);

    return (
      <Provider store={system.store()}>
        <AppContext.Provider value={context}>
          <Component {...props} />
        </AppContext.Provider>
      </Provider>
    );
  }

  //@ts-expect-error
  const PureWrapper: React.ComponentType<T> = React.memo(ProviderWrapper);
  hoistNonReactStatics(PureWrapper, Component);

  return PureWrapper;
}
