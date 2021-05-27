import {useFocusEffect, useNavigation} from '@react-navigation/core';
import {Container} from 'native-base';
import React, {useEffect} from 'react';
import {BackHandler} from 'react-native';
import SubHeader from '../components/common/SubHeader';
import PaymentSuccessContainer from '../containers/payment/PaymentSuccessContainer';

const PaymentSuccessPage = () => {
  const navigation = useNavigation();
  const backAction = () => {
    navigation.navigate('MainPage');
    return true;
  };

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', backAction);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', backAction);
      };
    }, []),
  );

  return (
    <Container>
      <SubHeader title={'결제 완료 페이지'} isIcon={false} />
      <PaymentSuccessContainer backAction={backAction} />
    </Container>
  );
};

export default PaymentSuccessPage;
