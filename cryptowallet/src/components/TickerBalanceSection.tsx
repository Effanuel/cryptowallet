import React from 'react';
import {Text, View} from 'react-native-ui-lib';
import {Balance} from '../api/apiService';

interface Props {
  balance: Balance;
}

export default function TickerBalanceSection({balance}: Props) {
  return (
    <View center>
      <Text white text60L marginB-2>
        Ticker Balance
      </Text>
      <View row bottom marginB-2>
        <Text white text40L>
          {balance.amount}
        </Text>
        <Text orange30 marginB-2 text60L>
          {` ${balance.symbol.baseSymbol}`}
        </Text>
      </View>

      <View row>
        <Text white>{`(`}</Text>
        <Text color="#4caf50">{`$ `}</Text>
        <Text white>{`${(balance.symbol.currentPrice * balance.amount).toFixed(5)}`}</Text>
        <Text white>{`)`}</Text>
      </View>
    </View>
  );
}
