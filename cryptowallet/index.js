import {registerScreens, registerAppListener} from './src/screens/index';
import {WalletApiService} from './src/api/apiService';

registerScreens({api: () => new WalletApiService()});
registerAppListener();
