import React from 'react';
import {Text, View} from 'react-native-ui-lib';
import {Balance} from '../api/apiService';

interface Props {
  balance: Balance;
}

export default function PriceSection({balance}: Props) {
  return (
    <View center>
      <Text white text60L marginB-2>
        {balance.symbol.name}
      </Text>
      <View row marginB-2>
        <Text color="#4caf50" text40L>
          {`$ `}
        </Text>
        <Text white text40L>
          {balance.symbol.currentPrice}
        </Text>
      </View>
      <Text white>current price</Text>
    </View>
  );
}
