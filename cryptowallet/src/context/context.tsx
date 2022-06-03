import React from 'react';
import type {WalletApiService} from '../api/apiService';
import {Navigator} from './navigator';

export interface AppContext {
  componentId: string;
  apiService: WalletApiService;
  navigator: Navigator;
}

export const AppContext = React.createContext<AppContext | undefined>(undefined);

export function useAppContext(): AppContext {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext can only be used in screens wrapped with addProviders');
  }
  return context;
}
