import React from 'react';
import {Colors, TextField} from 'react-native-ui-lib';
import {numberTransformer} from '../general/utils';

interface Props {
  value: string;
  placeholder: string;
  onChangeText: (value: string) => void;
  maxLength?: number;
  numeric?: boolean;
}

export default function InputField({onChangeText, placeholder, value, numeric, maxLength}: Props) {
  const emitChangeText = React.useCallback(
    (text: string) => onChangeText(numeric ? numberTransformer(text) : text),
    [onChangeText, numeric],
  );

  return (
    <TextField
      migrate
      onChangeText={emitChangeText}
      placeholderTextColor={Colors.grey30}
      placeholder={placeholder}
      keyboardType={numeric ? 'numeric' : 'default'}
      value={value}
      maxLength={maxLength}
      paddingV-s2
      white
      text70L
    />
  );
}
