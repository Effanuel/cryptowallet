import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useWalletQuery} from '../redux/modules/wallet/actions';

export default function WalletPreview() {
  const data = useWalletQuery();

  switch (data.type) {
    case 'loading':
      return <Text>LOADING</Text>;
    case 'success':
      return (
        <View style={styles.root}>
          <View style={styles.balance}>
            <Text style={styles.heading}>Total Balance:</Text>
            <Text style={styles.heading}>{data.result.totalUSD}</Text>
          </View>
        </View>
      );
    case 'error':
      return <Text>{data.message}</Text>;
  }
}

WalletPreview.options = () => ({
  topBar: {
    title: {text: 'Wallet'},
  },
});

const styles = StyleSheet.create({
  root: {flex: 1, paddingHorizontal: 20},
  heading: {fontSize: 20},
  balance: {flex: 1, flexDirection: 'row'},
});
