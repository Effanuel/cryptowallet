import React from 'react';
import {Text, View} from 'react-native-ui-lib';
import {roundTo} from '../general/utils';

interface Props {
  amount: number;
}

export default function TotalBalanceSection({amount}: Props) {
  return (
    <View center>
      <Text white text60L marginB-2>
        Total Balance
      </Text>
      <View row marginB-2>
        <Text color="#4caf50" text40L>
          {`$ `}
        </Text>
        <Text white text40L>
          {roundTo(amount, 1e-5)}
        </Text>
      </View>
    </View>
  );
}
