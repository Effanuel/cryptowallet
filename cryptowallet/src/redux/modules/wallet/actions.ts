import {NetworkHook, useNetworkExecutor} from '../../../hooks/network';
import {Wallet} from '../../api/apiService';

export type WalletAction = {type: 'WalletPreview'; payload: Wallet};

export const useWalletQuery: NetworkHook<Wallet, void> = () =>
  useNetworkExecutor({}, ({apiService}) => ({
    execute: () => apiService.fetchWalletBalances(),
    save: (data) => createWalletLoaded(data),
  }));

function createWalletLoaded(payload: Wallet): WalletAction {
  return {type: 'WalletPreview', payload};
}
