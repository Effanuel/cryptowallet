import React from 'react';
import {View, Text} from 'react-native-ui-lib';
import {Balance} from '../api/apiService';
import TickerBalanceSection from '../components/TickerBalanceSection';
import Divider from '../components/Divider';
import InputField from '../components/InputField';
import PriceSection from '../components/PriceSection';
import {numberPrettier} from '../general/utils';

interface Props {
  balance: Balance;
}

export default function CurrencyDetails({balance}: Props) {
  const [state, setState] = React.useState<string | null>('');

  const value = !state
    ? '0'
    : numberPrettier(isNaN(parseFloat(state)) ? 0 : parseFloat(state) * balance.symbol.currentPrice);

  return (
    <View bg-dark flex paddingH-s4 paddingT-s4>
      <TickerBalanceSection balance={balance} />
      <Divider />
      <PriceSection balance={balance} />
      <Divider />

      <Text text70L white>
        Check amount
      </Text>
      <InputField onChangeText={setState} placeholder="Enter amount" value={state !== null ? '' + state : ''} numeric />
      <Text text50L white>{` = $${value}`}</Text>
      <Divider />
    </View>
  );
}
