interface ISymbol {
  id: string;
  name: string;
  currentPrice: number;
}

export interface Balance {
  symbol: ISymbol;
  amount: number;
  dailyChangePercentage: number;
}

export interface Wallet {
  totalUSD: number;
  balances: Balance[];
}

export class WalletApiService {
  fetchWalletBalance = async (): Promise<Wallet> => {
    return {
      totalUSD: 123,
      balances: [
        {
          symbol: {id: 'bitcoin', name: 'BTC', currentPrice: 321},
          amount: 0.1,
          dailyChangePercentage: -3,
        },
        {
          symbol: {id: 'eth', name: 'ETH', currentPrice: 15000},
          amount: 2,
          dailyChangePercentage: -3,
        },
      ],
    };
  };
}
