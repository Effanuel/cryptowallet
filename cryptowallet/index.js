import {registerScreens, registerAppListener} from './src/screens/index';
import {createStore} from './src/redux/configureStore';
import {WalletApiService} from './src/redux/api/apiService';

registerScreens({store: () => createStore(), api: () => new WalletApiService()});
registerAppListener();
