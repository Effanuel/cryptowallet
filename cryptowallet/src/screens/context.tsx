import React from 'react';
import type {WalletApiService} from '../redux/api/apiService';

export interface AppContext {
  componentId: string;
  apiService: WalletApiService;
}

export const AppContext = React.createContext<AppContext | undefined>(undefined);

export function useAppContext(): AppContext {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext can only be used in screens wrapped with addProviders');
  }
  return context;
}
