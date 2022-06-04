import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native-ui-lib';
import {Balance} from '../api/apiService';
import {TICKER} from '../test-ids';
import Price from './Price';

interface Props {
  balance: Balance;
}

export default function PriceSection({balance}: Props) {
  const {t} = useTranslation();

  return (
    <View center>
      <Text white text60L>
        {balance.symbol.name}
      </Text>
      <View row marginV-2>
        <Price testID={TICKER.PRICE} amount={balance.symbol.currentPrice} format={false} text40L />
      </View>
      <Text white>{t('CurrencyDetails.Price.Title')}</Text>
    </View>
  );
}
