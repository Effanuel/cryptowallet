import React from 'react';
import {FlatList, ListRenderItem, RefreshControl} from 'react-native';
import {Text, View} from 'react-native-ui-lib';
import {useTranslation} from 'react-i18next';
import BalanceItem from '../components/BalanceItem';
import {useAppContext} from '../context/context';
import {Balance} from '../api/apiService';
import {useWalletQuery} from '../api/actions';
import {WALLET} from '../test-ids';
import Divider from '../components/Divider';
import Price from '../components/Price';

const keyExtractor = (balance: Balance) => balance.symbol.id;

export default function WalletDetails() {
  const {navigator} = useAppContext();
  const {t} = useTranslation();

  const [status, retrigger] = useWalletQuery();

  const openCurrencyDetails = React.useCallback(
    (balance: Balance) => navigator.openCurrencyDetails({balance}),
    [navigator],
  );

  const renderBalanceItem: ListRenderItem<Balance> = React.useCallback(
    ({item}) => <BalanceItem testID={WALLET.ROW} balance={item} onPress={openCurrencyDetails} />,
    [openCurrencyDetails],
  );

  switch (status.type) {
    case 'loading':
      return (
        <View bg-dark paddingT-s4 flex>
          <Text white>Loading</Text>
        </View>
      );
    case 'refetch':
    case 'success':
      return (
        <View bg-dark paddingT-s4 flex>
          <View center>
            <Text white text60L marginB-2>
              {t('WalletDetails.Title')}
            </Text>
            <Price testID={WALLET.PRICE} amount={status.result.totalUSD} text40L />
          </View>
          <Divider marginB-0 />
          {status.result.totalUSD === 0 ? (
            <Text white text60L center testID={WALLET.EMPTY_STATE}>
              {t('WalletDetails.Empty.Title')}
            </Text>
          ) : (
            <FlatList
              keyExtractor={keyExtractor}
              data={status.result.balances}
              renderItem={renderBalanceItem}
              initialNumToRender={20}
              refreshControl={<RefreshControl refreshing={status.type === 'refetch'} onRefresh={retrigger} />}
            />
          )}
        </View>
      );
    case 'error':
      return (
        <View bg-dark paddingT-s4 flex>
          <Text white>{status.message}</Text>
        </View>
      );
  }
}

WalletDetails.options = () => ({
  topBar: {
    title: {text: 'Wallet'},
  },
});
