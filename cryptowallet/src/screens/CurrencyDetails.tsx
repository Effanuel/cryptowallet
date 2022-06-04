import React from 'react';
import {View, Text} from 'react-native-ui-lib';
import {Balance} from '../api/apiService';
import TickerBalanceSection from '../components/TickerBalanceSection';
import Divider from '../components/Divider';
import InputField from '../components/InputField';
import PriceSection from '../components/PriceSection';
import {useTranslation} from 'react-i18next';
import Price from '../components/Price';

interface Props {
  balance: Balance;
}

export default function CurrencyDetails({balance}: Props) {
  const [state, setState] = React.useState<string | null>('');

  const {t} = useTranslation();

  const value = !state ? 0 : isNaN(parseFloat(state)) ? 0 : parseFloat(state) * balance.symbol.currentPrice;

  return (
    <View bg-dark flex paddingH-s4 paddingT-s4>
      <TickerBalanceSection balance={balance} />
      <Divider />
      <PriceSection balance={balance} />
      <Divider />
      <Text text70L white>
        {t('CurrencyDetails.CheckAmount.Title')}
      </Text>
      <InputField
        onChangeText={setState}
        placeholder={t('CurrencyDetails.CheckAmount.Placeholder', {symbol: balance.symbol.baseSymbol})}
        value={state !== null ? '' + state : ''}
        numeric
        maxLength={15}
      />
      <Price amount={value} text50L format={false} />
      <Divider />
    </View>
  );
}
