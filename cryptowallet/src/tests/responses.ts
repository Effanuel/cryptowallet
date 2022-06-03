import Chance from 'chance';
import {Wallet} from '../api/apiService';

const chance = new Chance();

export function forgeWallet(totalUSD: number, symbols: string[]): Wallet {
  return {
    totalUSD,
    balances: symbols.map((symbol) => ({
      symbol: {id: chance.guid(), name: symbol, currentPrice: 666},
      amount: 123,
      dailyChangePercentage: 3,
    })),
  };
}
