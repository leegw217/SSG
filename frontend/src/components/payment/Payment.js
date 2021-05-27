import {List, ListItem, Radio, Text, View} from 'native-base';
import React from 'react';
import {Image, ScrollView, StyleSheet} from 'react-native';
import {PaymentSuccessListItem} from '../payment/PaymentSuccess';

const Payment = ({shoppingList, sumPrice, paymentType, onChangeType}) => {
  return (
    <>
      <ScrollView>
        <View style={styles.paymentMethod}>
          <Text style={styles.title}>결제방법</Text>
          <ListItem onPressOut={() => onChangeType(1)}>
            <Radio
              onPressOut={() => onChangeType(1)}
              style={styles.radio}
              color={'lightgrey'}
              selectedColor={'rgb(240,41,28)'}
              selected={paymentType === 1 && true}
            />
            <Image
              style={styles.image}
              source={require('../../../imgs/SSGPAY.jpg')}
            />
            <Text
              style={paymentType === 1 ? styles.selected : styles.unSelected}>
              카드
            </Text>
          </ListItem>
          <ListItem onPressOut={() => onChangeType(2)}>
            <Radio
              onPressOut={() => onChangeType(2)}
              color={'lightgrey'}
              selectedColor={'rgb(240,41,28)'}
              selected={paymentType === 2 && true}
            />
            <Image
              style={styles.image}
              source={require('../../../imgs/SSGPAY.jpg')}
            />
            <Text
              style={paymentType === 2 ? styles.selected : styles.unSelected}>
              계좌
            </Text>
          </ListItem>
          <ListItem onPressOut={() => onChangeType(3)}>
            <Radio
              onPressOut={() => onChangeType(3)}
              color={'lightgrey'}
              selectedColor={'rgb(240,41,28)'}
              selected={paymentType === 3 && true}
            />
            <Text
              style={
                (styles.bottomText,
                paymentType === 3 ? styles.selected : styles.unSelected)
              }>
              다른 결제수단
            </Text>
          </ListItem>
        </View>
        <View style={styles.paymentMethod}>
          <Text style={styles.title}>결제 예정금액</Text>
          <View style={styles.body}>
            <View style={styles.span}>
              <Text>총 결제예정금액</Text>
              <Text>+ {sumPrice}원</Text>
            </View>
          </View>
        </View>
        <View style={styles.paymentMethod}>
          <Text style={styles.title}>결제목록</Text>
          <List style={styles.list}>
            {shoppingList.paymentDetail &&
              shoppingList.paymentDetail.map(item => (
                <PaymentSuccessListItem key={item.prodId} {...item} />
              ))}
          </List>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  paymentMethod: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgb(220,220,220)',
    margin: 10,
  },
  title: {
    marginLeft: 15,
    marginTop: 15,
    fontSize: 20,
    fontWeight: 'bold',
  },
  body: {
    margin: 15,
  },
  span: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  list: {
    marginTop: 10,
  },
  image: {
    width: 65,
    height: 15,
    marginBottom: 1,
  },
  radio: {
    marginTop: 2,
  },
  bottomText: {
    marginLeft: 2,
  },
  selected: {
    fontWeight: 'bold',
  },
  unSelected: {},
});
export default Payment;
