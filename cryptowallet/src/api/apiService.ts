import axios, {AxiosResponse} from 'axios';
import {Ticker24hr} from './BinanceTypes';

interface Ticker {
  name: string;
  currentPrice: number;
  currencyFrom: string;
  currencyFromScale: 8;
  currencyTo: string;
  currencyToScale: 2;
  last: 0.00003361;
  lastHP: 0.0000336140841426376249125599381725069145;
  timestamp: 1654295725045;
  friendlyLast: '1 USD = 0.00003361 BTC';
}

const balance: Record<string, number> = {
  'BTC/USD': 0.31244124,
  'USDP/USD': 0.32,
  'ETH/USD': 0.327834478541236547,
  'BNK/USD': 131231567,
};

interface ISymbol {
  id: string;
  name: string;
  currentPrice: number;
  baseSymbol: string;
}

export interface Balance {
  symbol: ISymbol;
  amount: number;
}

export interface Wallet {
  totalUSD: number;
  balances: Balance[];
}

export class WalletApiService {
  private fetchBatchTickers = (tickers: string[]): Promise<Ticker>[] =>
    tickers.map((ticker) =>
      axios.get(`https://spectrocoin.com/scapi/ticker/${ticker}`).then((response: AxiosResponse<Ticker>) => ({
        ...response.data,
        name: ticker,
        currentPrice: 1 / response.data.last,
      })),
    );

  fetchWalletBalance = async (): Promise<Wallet> => {
    const tickers = await Promise.all(this.fetchBatchTickers(Object.keys(balance)));

    // Ideally, backend should calculate everything and return all the data at once, so client doesn't need to do any calculations
    const totalUSD = tickers.reduce((sum, ticker) => (sum += ticker.currentPrice * balance[ticker.name]), 0);

    return {
      totalUSD,
      balances: tickers.map(({name, currentPrice, currencyFrom}) => ({
        symbol: {id: name, name, currentPrice, baseSymbol: currencyFrom},
        amount: balance[name],
      })),
    };
  };
}
