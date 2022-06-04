import type {ComponentType} from 'react';
import {Navigation} from 'react-native-navigation';
import {Screen} from './names';
import {addContextProvider, System} from './wrappers';

export function registerScreens(system: System) {
  const screens: [Screen, () => ComponentType<any>][] = [
    [Screen.WalletDetails, () => require('../screens/WalletDetails').default],
    [Screen.CurrencyDetails, () => require('../screens/CurrencyDetails').default],
  ];

  screens.forEach(([id, render]) => {
    Navigation.registerComponent(id, () => addContextProvider(render(), system));
  });

  console.info('Screens were loaded.');
}

export function registerAppListener() {
  Navigation.events().registerAppLaunchedListener(async () => {
    Navigation.setDefaultOptions({
      topBar: {
        title: {color: 'white'},
        subtitle: {color: 'white'},
        backButton: {color: 'white', showTitle: false},
        background: {color: '#1e1e1e'},
      },
      statusBar: {style: 'light'},
    });
    setRootHomeScreen();
  });
}

function setRootHomeScreen() {
  Navigation.setRoot({
    root: {stack: {children: [{component: {name: Screen.WalletDetails}}]}},
  });
}
