import {registerScreens, registerAppListener} from './src/screens/index';
import {WalletApiService} from './src/api/apiService';
import {Colors} from 'react-native-ui-lib';
import './src/locale/i18n';

Colors.loadColors({
  dark: '#2a2a2a',
  green: '#4caf50',
});

registerScreens({api: () => new WalletApiService()});
registerAppListener();
