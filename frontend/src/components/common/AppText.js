/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text} from 'native-base';
const AppText = props => {
  return (
    <Text
      {...props}
      style={{
        ...props.style,
        fontFamily: 'NotoSansCJKkr-Regular',
      }}>
      {props.children}
    </Text>
  );
};

export default AppText;
