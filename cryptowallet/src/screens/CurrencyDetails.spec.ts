import {textOf} from 'influnt/dist/react-native';
import {TICKER} from '../test-ids';
import {createMainRenderer} from '../../test/influnt';
import {forgeBalance} from '../../test/responses';
import CurrencyDetails from './CurrencyDetails';

const render = createMainRenderer(CurrencyDetails);

describe('CurrencyDetails', () => {
  it('should display ticker balance and price', async () => {
    const result = await render({passProps: {balance: forgeBalance('BTC', 777, 888)}}) //
      .inspect({price: textOf(TICKER.PRICE), balance: textOf(TICKER.BALANCE)});

    expect(result).toEqual({
      balance: '689.975k',
      price: '777.000',
    });
  });
});
