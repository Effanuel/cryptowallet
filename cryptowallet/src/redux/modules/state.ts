import {ThunkAction} from '@reduxjs/toolkit';
import {WalletAction} from './wallet/actions';

export type Action = WalletAction;

export type Thunk = ThunkAction<void, AppState, any, Action>;

export interface AppState {}
