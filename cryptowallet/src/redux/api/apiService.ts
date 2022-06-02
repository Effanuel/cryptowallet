interface Balance {
  symbol: string;
  amount: number;
  dailyChangePercentage: number;
}

export interface Wallet {
  totalUSD: number;
  balances: Balance[];
}

export class WalletApiService {
  fetchWalletBalances = async (): Promise<Wallet> => {
    return {
      totalUSD: 123,
      balances: [
        {
          symbol: 'BTC',
          amount: 0.1,
          dailyChangePercentage: -3,
        },
        {
          symbol: 'ETH',
          amount: 2,
          dailyChangePercentage: -3,
        },
      ],
    };
  };
}
