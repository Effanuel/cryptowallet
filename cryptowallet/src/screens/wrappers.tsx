import hoistNonReactStatics from 'hoist-non-react-statics';
import React from 'react';
import {WalletApiService} from '../api/apiService';
import {AppContext} from '../context/context';
import {createNavigator} from '../context/navigator';

export interface System {
  api: () => WalletApiService;
}

export interface LifecycleMethods {
  shouldDismissModal?: () => boolean;
  onRegainConnectivity?: () => void;
}

interface ReactNavigationProps {
  componentId: string;
  registerLifecycleMethods?: (methods: LifecycleMethods) => void;
}

export function addContextProvider<T>(Component: React.ComponentType<T>, system: System): React.ComponentType<T> {
  function ProviderWrapper(props: T & ReactNavigationProps) {
    const {componentId} = props;

    const context: AppContext = React.useMemo(() => {
      return {
        componentId,
        apiService: system.api(),
        navigator: createNavigator(componentId),
      };
    }, [componentId]);

    return (
      <AppContext.Provider value={context}>
        <Component {...props} />
      </AppContext.Provider>
    );
  }

  //@ts-expect-error
  const PureWrapper: React.ComponentType<T> = React.memo(ProviderWrapper);
  hoistNonReactStatics(PureWrapper, Component);

  return PureWrapper;
}
