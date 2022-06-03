import React from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'react-native-ui-lib';

export default function Divider() {
  return <View style={styles.root} />;
}

const styles = StyleSheet.create({
  root: {
    borderWidth: 0.5,
    borderColor: 'grey',
    marginVertical: 12,
  },
});
