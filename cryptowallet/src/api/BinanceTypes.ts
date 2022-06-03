type Numerical = string;

export interface Ticker24hr {
  symbol: string;
  priceChange: Numerical;
  priceChangePercent: Numerical;
  weightedAvgPrice: Numerical;
  prevClosePrice: Numerical;
  lastPrice: Numerical;
  lastQty: Numerical;
  bidPrice: Numerical;
  bidQty: Numerical;
  askPrice: Numerical;
  askQty: Numerical;
  openPrice: Numerical;
  highPrice: Numerical;
  lowPrice: Numerical;
  volume: Numerical;
  quoteVolume: Numerical;
  openTime: number;
  closeTime: number;
  firstId: number;
  lastId: number;
  count: number;
}
