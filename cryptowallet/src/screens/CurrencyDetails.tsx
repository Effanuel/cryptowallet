import React from 'react';
import {StyleSheet} from 'react-native';
import {View, TextField, Text, Button} from 'react-native-ui-lib';
import {Balance} from '../api/apiService';

interface Props {
  balance: Balance;
}

export default function CurrencyDetails(props: Props) {
  return (
    <View style={styles.root}>
      <Text color="red">Symbol</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
