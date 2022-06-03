import React from 'react';
import {Text, View} from 'react-native-ui-lib';

interface Props {
  name: string;
  price: number;
}

export default function PriceSection({name, price}: Props) {
  return (
    <View center>
      <Text white text60L marginB-2>
        {name}
      </Text>
      <View row marginB-2>
        <Text color="#4caf50" text50L>
          {`$ `}
        </Text>
        <Text white text40L>
          {price}
        </Text>
      </View>
      <Text white>current price</Text>
    </View>
  );
}
