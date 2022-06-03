import {NetworkHook, useNetworkExecutor} from '../hooks/network';
import {Wallet} from './apiService';

export type WalletAction = {type: 'WalletPreview'; payload: Wallet};

export const useWalletQuery: NetworkHook<Wallet, void> = () =>
  useNetworkExecutor({}, ({apiService}) => ({
    execute: () => apiService.fetchWalletBalance(),
  }));
