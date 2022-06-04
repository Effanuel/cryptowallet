import React from 'react';
import {Navigation, Options} from 'react-native-navigation';
import CurrencyDetails from '../screens/CurrencyDetails';
import {Screen} from '../screens/names';
import {LifecycleMethods} from '../screens/wrappers';

export interface Navigator {
  openCurrencyDetails: (props: React.ComponentProps<typeof CurrencyDetails>) => void;
  registerLifecycleMethods: (methods: LifecycleMethods) => void;
  setDisabled: () => void;
}

interface SimpleScreenOptions {
  title?: string;
  subtitle?: string;
  topBarHidden?: boolean;
  bottomTabsHidden?: boolean;
}

function buildOptions(screen: SimpleScreenOptions): {options: Options} | undefined {
  const topBar = !(screen.title || screen.subtitle)
    ? undefined
    : {
        ...(screen.title ? {title: {text: screen.title}} : {}),
        ...(screen.subtitle ? {subtitle: {text: screen.subtitle}} : {}),
        ...(screen.topBarHidden ? {visible: false} : {}),
      };
  const bottomTabs = screen.bottomTabsHidden ? {visible: false} : undefined;
  return topBar || bottomTabs ? {options: {topBar, bottomTabs}} : undefined;
}

interface PassProps {
  [key: string]: unknown;
}

export function createNavigator(
  componentId: string,
  registerLifecycleMethods?: (methods: LifecycleMethods) => void,
): Navigator {
  let isEnabled = true;

  function pushToStack(name: string, passProps: PassProps, screen: SimpleScreenOptions = {}): void {
    if (isEnabled) {
      const component = {name, passProps, ...buildOptions(screen)};
      Navigation.push(componentId, {component});
    }
  }

  return {
    openCurrencyDetails: (props) => {
      pushToStack(Screen.CurrencyDetails, {...props}, {title: 'Ticker'});
    },
    setDisabled: () => {
      isEnabled = false;
    },
    registerLifecycleMethods: (methods) => {
      if (typeof registerLifecycleMethods === 'function') {
        registerLifecycleMethods(methods);
      } else {
        console.error(`Cannot register lifecycle methods : ${Object.keys(methods).join(',')}`);
      }
    },
  };
}
