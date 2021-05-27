import {Container} from 'native-base';
import React from 'react';
import {useState} from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import SubHeader from '../components/common/SubHeader';
import Payment from '../components/payment/Payment';
import PaymentFooter from '../components/payment/PaymentFooter';
import Spinner from '../components/common/Spinner';

const PaymentPage = ({navigation}) => {
  const {shoppingList, loading} = useSelector(({shoppingList}) => ({
    shoppingList: shoppingList,
    loading: shoppingList.loading,
  }));
  const [paymentType, setPaymentType] = useState(1);
  const onChangeType = typeNo => {
    setPaymentType(typeNo);
  };
  return (
    <Container style={styles.container}>
      <SubHeader navigation={navigation} title={'결제하기'} isIcon={false} />
      {loading && <Spinner />}
      <Payment
        shoppingList={shoppingList}
        sumPrice={shoppingList.sumPrice
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        paymentType={paymentType}
        onChangeType={onChangeType}
      />
      <PaymentFooter
        navigation={navigation}
        sumPrice={shoppingList.sumPrice
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        paymentType={paymentType}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {backgroundColor: 'rgb(230,230,230)'},
});

export default PaymentPage;
