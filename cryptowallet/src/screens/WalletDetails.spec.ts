import {countOf, exists, respond, textOf} from 'influnt/dist/react-native';
import {WALLET} from '../test-ids';
import {createMainRenderer} from '../../test/influnt';
import {forgeWallet} from '../../test/responses';
import {Screen} from './names';
import WalletDetails from './WalletDetails';

const render = createMainRenderer(WalletDetails);

describe('WalletDetails', () => {
  it('should display empty state if balance is 0', async () => {
    const walletBalanceResponse = respond('fetchWalletBalance', [undefined]).with(forgeWallet(0, []));

    const result = await render()
      .resolve(walletBalanceResponse)
      .inspect({emptyStateVisible: exists(WALLET.EMPTY_STATE)});

    expect(result).toEqual({
      emptyStateVisible: true,
      network: [{fetchWalletBalance: [undefined]}],
    });
  });

  it('should show balance rows', async () => {
    const walletBalanceResponse = respond('fetchWalletBalance', [undefined]).with(forgeWallet(777, ['btc', 'eth']));

    const result = await render()
      .resolve(walletBalanceResponse)
      .inspect({symbolCount: countOf(WALLET.ROW), priceText: textOf(WALLET.PRICE)});

    expect(result).toEqual({
      priceText: '777.000',
      symbolCount: 2,
      network: [{fetchWalletBalance: [undefined]}],
    });
  });

  it('should open currency details screen', async () => {
    const walletBalanceResponse = respond('fetchWalletBalance', [undefined]).with(forgeWallet(777, ['btc', 'eth']));

    const result = await render().resolve(walletBalanceResponse).press(WALLET.ROW, {index: 0});

    expect(result).toEqual({
      navigation: [
        {
          push: [
            Screen.CurrencyDetails,
            {
              balance: {
                amount: 123,
                dailyChangePercentage: 3,
                symbol: {currentPrice: 666, id: expect.any(String), name: 'btc', baseSymbol: 'B', quoteSymbol: 'Q'},
              },
            },
          ],
        },
      ],
      network: [{fetchWalletBalance: [undefined]}],
    });
  });
});
