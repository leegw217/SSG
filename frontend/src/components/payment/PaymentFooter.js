/* eslint-disable react-native/no-inline-styles */
import {Right, View} from 'native-base';
import React from 'react';
import {Alert, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {requestPayment} from '../../modules/payment';
import AppText from '../common/AppText';

const PaymentFooter = ({sumPrice, navigation, paymentType}) => {
  const dispatch = useDispatch();
  const type = ['', '카드', '현금', '카드'];
  const onPayment = () => {
    if (sumPrice === '0') {
      return;
    }

    Alert.alert(
      '결제 하시겠습니까?',
      '총 금액 : ' + sumPrice + '원',
      [
        {
          text: '아니요',
          style: 'cancel',
        },
        {
          text: '네',
          onPress: () => {
            dispatch(requestPayment(type[paymentType]));
            navigation.navigate('PaymentSuccessPage');
          },
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <View style={styles.footer}>
      <Right style={styles.footerRight}>
        <TouchableOpacity
          style={styles.footerRightBlock}
          onPress={() => {
            onPayment();
          }}>
          <AppText style={{color: 'white', fontSize: 20}}>결제하기</AppText>
        </TouchableOpacity>
      </Right>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    height: 50,
    borderTopColor: 'rgb(240,240,240)',
    borderTopWidth: 1,
    backgroundColor: 'white',
  },
  footerRight: {
    backgroundColor: 'rgb(240,41,28)',
    flex: 2,
  },
  footerRightBlock: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerLeft: {
    flex: 3,
    backgroundColor: 'white',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentText: {
    fontWeight: 'bold',
  },
});

export default PaymentFooter;
