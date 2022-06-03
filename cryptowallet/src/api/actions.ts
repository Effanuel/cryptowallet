import {NetworkHook, useNetworkExecutor} from '../hooks/network';
import {Wallet} from './apiService';

export const useWalletQuery: NetworkHook<Wallet, void> = () =>
  useNetworkExecutor({}, ({apiService}) => ({
    execute: () => apiService.fetchWalletBalance(),
  }));
