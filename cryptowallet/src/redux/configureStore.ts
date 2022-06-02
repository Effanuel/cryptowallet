import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import {AppState} from './modules/state';

const rootReducer = combineReducers({});

export function createStore(preloadedState: Partial<AppState> = {}) {
  return configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    reducer: rootReducer,
    preloadedState,
  });
}

export type AppStore = ReturnType<typeof createStore>;
export const useAppDispatch = () => useDispatch<AppStore['dispatch']>();
