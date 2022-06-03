import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Balance} from '../api/apiService';

interface Props {
  testID?: string;
  balance: Balance;
  onPress: (balance: Balance) => void;
}

export default React.memo(function BalanceItem({testID, balance, onPress}: Props) {
  const {symbol, amount, dailyChangePercentage} = balance;

  const emitPress = () => onPress(balance);

  return (
    <TouchableOpacity
      testID={testID}
      onPress={emitPress}
      style={{
        flexDirection: 'row',
        backgroundColor: 'grey',
        borderColor: 'red',
        borderWidth: 1,
        paddingVertical: 20,
        paddingLeft: 8,
      }}>
      <Text>{symbol.name} </Text>
      <Text>{amount} </Text>
      <Text>{dailyChangePercentage}%</Text>
    </TouchableOpacity>
  );
});
