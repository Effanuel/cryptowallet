import React from 'react';
import {Text, TextProps} from 'react-native-ui-lib';
import {numberFormatter, numberPrettier, roundTo} from '../general/utils';

type Props = TextProps & {
  amount: number;
  decimals?: number;
  format?: boolean;
  baseSymbol?: string;
};

export default function Price({amount, baseSymbol, format = true, decimals = 5, testID, ...rest}: Props) {
  const price = roundTo(amount, 1 / Math.pow(10, decimals));

  return (
    <Text row {...rest}>
      {!baseSymbol && <Text green>$ </Text>}
      <Text testID={testID} white>
        {format ? numberPrettier(price) : numberFormatter(price)}
      </Text>
      {baseSymbol && <Text orange30> {baseSymbol}</Text>}
    </Text>
  );
}
