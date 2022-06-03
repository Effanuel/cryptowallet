import React from 'react';
import {StyleSheet} from 'react-native';
import {View, TextField, Text, Button} from 'react-native-ui-lib';
import {Balance} from '../api/apiService';
import BalanceSection from '../components/BalanceSection';
import Divider from '../components/Divider';
import InputField from '../components/InputField';
import PriceSection from '../components/PriceSection';
import {numberPrettier, numberTransformer} from '../general/utils';

interface Props {
  balance: Balance;
}

export default function CurrencyDetails({balance}: Props) {
  const [state, setState] = React.useState('');

  const value = numberPrettier(isNaN(parseFloat(state)) ? 0 : parseFloat(state) * balance.symbol.currentPrice);
  return (
    <View style={styles.root}>
      <PriceSection name={balance.symbol.name} price={balance.symbol.currentPrice} />
      <Divider />
      <BalanceSection amount={balance.amount} price={balance.symbol.currentPrice} />
      <Divider />

      <Text text70L white>
        Check amount
      </Text>
      <InputField
        onChangeText={setState}
        placeholder="Quantity"
        value={state}
        transformer={numberTransformer}
        numeric
      />
      <Text text50L white>{` = $${value}`}</Text>
      <Divider />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  row: {
    flexDirection: 'row',
  },
});
