import axios, {AxiosResponse} from 'axios';
import {Ticker24hr} from './BinanceTypes';

const balance: Record<string, number> = {
  BTCUSDT: 0.31244124,
  USDPUSDT: 0.32,
  ETHUSDT: 0.327834478541236547,
  SHIBUSDT: 131231567, // This replaced Banker, since Binance API doesn't have one
};

interface ISymbol {
  id: string;
  name: string;
  currentPrice: number;
  dailyChangePercentage: number;
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
  private request = async <T>(path: string, params: Record<string, unknown>): Promise<AxiosResponse<T>> =>
    axios.get(`https://api.binance.com${path}`, {params});

  fetchWalletBalance = async (): Promise<Wallet> => {
    const {data} = await this.request<Ticker24hr[]>('/api/v3/ticker/24hr', {
      symbols: JSON.stringify(Object.keys(balance)),
    });

    // Ideally, backend should calculate everything and return all the data at once, so client doesn't need to do any calculations
    const totalUSD = data.reduce((sum, ticker) => (sum += parseFloat(ticker.lastPrice) * balance[ticker.symbol]), 0);

    return {
      totalUSD,
      balances: data.map(({symbol, lastPrice, priceChangePercent}) => ({
        symbol: {
          id: symbol,
          name: symbol,
          currentPrice: parseFloat(lastPrice),
          dailyChangePercentage: parseFloat(priceChangePercent),
        },
        amount: balance[symbol],
      })),
    };
  };
}
