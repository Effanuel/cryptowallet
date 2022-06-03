import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native-ui-lib';
import {Balance} from '../api/apiService';

interface Props {
  testID?: string;
  balance: Balance;
  onPress: (balance: Balance) => void;
}

export default React.memo(function BalanceItem({testID, balance, onPress}: Props) {
  const {symbol, amount} = balance;

  const emitPress = () => onPress(balance);

  return (
    <TouchableOpacity
      testID={testID}
      onPress={emitPress}
      row
      paddingL-s2
      paddingV-s5
      style={{borderBottomWidth: 1, borderBottomColor: 'grey', backgroundColor: 'green'}}>
      <View>
        <Text white>{symbol.baseSymbol} </Text>
        <Text white>{balance.amount} </Text>
      </View>
      <Text>{amount} </Text>
    </TouchableOpacity>
  );
});
