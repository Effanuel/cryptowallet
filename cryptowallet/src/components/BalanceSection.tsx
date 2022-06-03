import React from 'react';
import {Text, View} from 'react-native-ui-lib';

interface Props {
  amount: number;
  price: number;
}

export default function BalanceSection({amount, price}: Props) {
  return (
    <View center>
      <Text white text60L marginB-2>
        Total Balance
      </Text>
      <View row marginB-2>
        <Text white text40L>
          {amount}
        </Text>
      </View>

      <View row>
        <Text white>{`(`}</Text>
        <Text color="#4caf50">{`$ `}</Text>
        <Text white>{`${(price * amount).toFixed(5)}`}</Text>
        <Text white>{`)`}</Text>
      </View>
    </View>
  );
}
