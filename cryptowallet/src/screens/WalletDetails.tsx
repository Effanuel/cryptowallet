import React from 'react';
import {FlatList, ListRenderItem} from 'react-native';
import {Text, View} from 'react-native-ui-lib';
import BalanceItem from '../components/BalanceItem';
import {useAppContext} from '../context/context';
import {Balance} from '../api/apiService';
import {useWalletQuery} from '../api/actions';
import {WALLET} from '../test-ids';
import TotalBalanceSection from '../components/TotalBalanceSection';
import Divider from '../components/Divider';

const keyExtractor = (balance: Balance) => balance.symbol.id;

export default function WalletDetails() {
  const {navigator} = useAppContext();

  const data = useWalletQuery();

  const openCurrencyDetails = React.useCallback(
    (balance: Balance) => navigator.openCurrencyDetails({balance}),
    [navigator],
  );

  const renderBalanceItem: ListRenderItem<Balance> = React.useCallback(
    ({item}) => <BalanceItem testID={WALLET.ROW} balance={item} onPress={openCurrencyDetails} />,
    [navigator],
  );

  switch (data.type) {
    case 'loading':
      return <Text>LOADING</Text>;
    case 'success':
      return (
        <View bg-dark paddingT-s4 flex paddingH-s5>
          <TotalBalanceSection amount={data.result.totalUSD} />
          <Divider />
          {data.result.totalUSD === 0 ? (
            <Text white text60L center testID={WALLET.EMPTY_STATE}>
              You balance is currently empty.
            </Text>
          ) : (
            <FlatList
              keyExtractor={keyExtractor}
              data={data.result.balances}
              renderItem={renderBalanceItem}
              initialNumToRender={20}
            />
          )}
        </View>
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
