import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native-ui-lib';
import {Balance} from '../api/apiService';
import {TICKER} from '../test-ids';
import Price from './Price';

interface Props {
  balance: Balance;
}

export default function TickerBalanceSection({balance}: Props) {
  const {t} = useTranslation();
  return (
    <View center>
      <Text white text60L>
        {t('CurrencyDetails.Title')}
      </Text>
      <Price amount={balance.amount} text40L baseSymbol={balance.symbol.baseSymbol} marginV-2 />
      <View row>
        <Text white>{'('}</Text>
        <Price testID={TICKER.BALANCE} amount={balance.symbol.currentPrice * balance.amount} />
        <Text white>{')'}</Text>
      </View>
    </View>
  );
}
