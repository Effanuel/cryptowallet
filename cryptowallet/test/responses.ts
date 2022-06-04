import Chance from 'chance';
import {Balance, Wallet} from '../src/api/apiService';

const chance = new Chance();

export function forgeWallet(totalUSD: number, symbols: string[]): Wallet {
  return {totalUSD, balances: symbols.map((symbol) => forgeBalance(symbol, 666, 123))};
}

export function forgeBalance(symbol: string, price: number, balance: number): Balance {
  return {
    symbol: {id: chance.guid(), name: symbol, currentPrice: price, baseSymbol: 'B', quoteSymbol: 'Q'},
    amount: balance,
  };
}
