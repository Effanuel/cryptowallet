import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {Text, TouchableOpacity, View} from 'react-native-ui-lib';
import type {Balance} from '../api/apiService';
import Price from './Price';

interface Props {
  testID?: string;
  balance: Balance;
  onPress: (balance: Balance) => void;
}

export default React.memo(function BalanceItem({testID, balance, onPress}: Props) {
  const {symbol, amount} = balance;

  const {t} = useTranslation();

  const emitPress = () => onPress(balance);

  return (
    <TouchableOpacity testID={testID} onPress={emitPress} row paddingH-s4 paddingV-s3 center style={styles.root}>
      <View flex>
        <Text white text60BO>
          {symbol.baseSymbol}
        </Text>
        <Price text70BO amount={amount * symbol.currentPrice} decimals={3} />
        <Text grey40 numberOfLines={1} ellipsizeMode="middle">
          {`${amount} ${symbol.baseSymbol}`}
        </Text>
      </View>
      <View flex right>
        <Text white text80L>
          {t('WalletDetails.Item.Price')}
        </Text>
        <Price amount={symbol.currentPrice} format={false} numberOfLines={1} ellipsizeMode="tail" />
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  root: {
    borderBottomWidth: 1,
    borderColor: 'grey',
    justifyContent: 'space-between',
  },
});
