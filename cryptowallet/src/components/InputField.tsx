import React from 'react';
import {StyleSheet} from 'react-native';
import {Colors, Spacings, TextField} from 'react-native-ui-lib';
import {numberTransformer} from '../general/utils';

interface Props {
  value: string;
  placeholder: string;
  onChangeText: (value: string) => void;
  errorMessage?: string;
  maxLength?: number;
  numeric?: boolean;
  transformer?: (value: string) => string;
  validate?: (value: string) => boolean;
  onChangeValidity?: (isValid: boolean) => void;
}

export default function InputField({
  onChangeText,
  placeholder,
  value,
  numeric,
  validate,
  errorMessage,
  onChangeValidity,
  maxLength,
  transformer,
}: Props) {
  return (
    <TextField
      migrate
      onChangeText={onChangeText}
      //   placeholderTextColor={Colors.white}
      //   floatingPlaceholder
      //   floatingPlaceholderColor={Colors.white}
      placeholder={placeholder}
      underlineColor="red"
      keyboardType={numeric ? 'numeric' : 'default'}
      //   transformer={transformer ?? (numeric && numberTransformer)}
      //   validate={validate}
      style={styles.root}
      value={value}
      //   errorMessage={errorMessage}
      //   onChangeValidity={onChangeValidity}
      //   maxLength={maxLength}
    />
  );
}

const styles = StyleSheet.create({
  root: {
    marginTop: Spacings.s1,
    color: 'white',
    backgroundColor: 'red',
  },
});
