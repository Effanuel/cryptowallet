import {registerScreens, registerAppListener} from './src/screens/index';
import {WalletApiService} from './src/api/apiService';
import {Colors} from 'react-native-ui-lib';

Colors.loadColors({
  dark: '#2a2a2a',
});

registerScreens({api: () => new WalletApiService()});
registerAppListener();
