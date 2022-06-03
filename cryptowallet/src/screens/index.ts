import {Navigation} from 'react-native-navigation';
import {Screen} from './names';
import {addProviders, System} from './wrappers';

export function registerScreens(system: System) {
  const screens = [
    {
      id: Screen.WalletDetails,
      render: () => addProviders(require('../screens/WalletDetails').default, system),
    },
    {
      id: Screen.CurrencyDetails,
      render: () => addProviders(require('../screens/CurrencyDetails').default, system),
    },
  ];

  screens.forEach(({id, render}) => {
    Navigation.registerComponent(id, render);
  });

  console.info('Screens were loaded.');
}

export function registerAppListener() {
  Navigation.events().registerAppLaunchedListener(async () => {
    Navigation.setDefaultOptions({
      topBar: {
        // title: {color: 'white'},
        // subtitle: {color: 'white'},
        // backButton: {color: 'white', showTitle: false},
        // background: {color: '#121212'},
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
