import React from 'react';
import {FlatList, ListRenderItem, ScrollView, StyleSheet, Text, View} from 'react-native';
import BalanceItem from '../components/BalanceItem';
import {useAppContext} from '../context/context';
import {Balance} from '../api/apiService';
import {useWalletQuery} from '../api/actions';
import {WALLET} from '../test-ids';

const keyExtractor = (balance: Balance) => balance.symbol.id;

export default function WalletDetails() {
  const {navigator} = useAppContext();

  const data = useWalletQuery();

  const openCurrencyDetails = React.useCallback((balance: Balance) => navigator.openCurrencyDetails({balance}), []);

  const renderBalanceItem: ListRenderItem<Balance> = React.useCallback(
    ({item}) => <BalanceItem testID={WALLET.ROW} balance={item} onPress={openCurrencyDetails} />,
    [navigator],
  );

  switch (data.type) {
    case 'loading':
      return <Text>LOADING</Text>;
    case 'success':
      return (
        <ScrollView style={styles.root}>
          <View style={styles.balance}>
            <Text style={styles.heading}>Total Balance:</Text>
            <Text testID={WALLET.PRICE} style={styles.heading}>
              {data.result.totalUSD}
            </Text>
          </View>
          {data.result.totalUSD === 0 ? (
            <Text testID={WALLET.EMPTY_STATE}>You balance is empty</Text>
          ) : (
            <FlatList
              keyExtractor={keyExtractor}
              data={data.result.balances}
              renderItem={renderBalanceItem}
              initialNumToRender={20}
            />
          )}
        </ScrollView>
      );
    case 'error':
      return <Text>{data.message}</Text>;
  }
}

WalletDetails.options = () => ({
  topBar: {
    title: {text: 'Wallet'},
  },
});

const styles = StyleSheet.create({
  root: {flex: 1, paddingHorizontal: 20},
  heading: {fontSize: 20},
  balance: {flex: 1, flexDirection: 'row'},
});
