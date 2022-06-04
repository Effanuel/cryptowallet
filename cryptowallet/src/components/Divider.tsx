import React from 'react';
import {StyleSheet} from 'react-native';
import {View, ViewProps} from 'react-native-ui-lib';

type Props = ViewProps;

export default function Divider(props: Props) {
  return <View marginV-s4 {...props} style={styles.root} />;
}

const styles = StyleSheet.create({
  root: {
    borderWidth: 0.5,
    borderColor: 'grey',
  },
});
