import {Body, Button, Left, List, ListItem, Right, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppText from '../common/AppText';

const PaymentSuccess = ({payment, backAction}) => {
  const [sumPrice, setSumPrice] = useState(0);
  useEffect(() => {
    let price = 0;
    for (let item of payment.paymentList) {
      price += item.prodPrice * item.qty;
    }
    setSumPrice(price.toLocaleString());
  }, [payment]);

  return (
    <>
      <ScrollView>
        <PaymentSuccessList paymentList={payment.paymentList} />
      </ScrollView>
      <View style={styles.viewWrap}>
        <View style={styles.view}>
          <Icon style={styles.icon_check} name="check" />
          <View style={styles.view_col}>
            <AppText style={styles.text}>{sumPrice}원</AppText>
            <AppText>결제가 완료되었습니다.</AppText>
          </View>
        </View>
        <Button style={styles.button} onPress={() => backAction()}>
          <AppText style={styles.buttonText}>홈으로</AppText>
        </Button>
      </View>
    </>
  );
};

const PaymentSuccessList = ({paymentList}) => {
  return (
    <List>
      {paymentList &&
        paymentList.map(item => (
          <PaymentSuccessListItem key={item.prodId} {...item} />
        ))}
    </List>
  );
};

export const PaymentSuccessListItem = ({
  prodImage,
  prodName,
  prodPrice,
  qty,
}) => {
  return (
    <ListItem style={listItemStyle.list}>
      <Left style={listItemStyle.left2}>
        <Image
          style={listItemStyle.left}
          source={{uri: 'data:image/png;base64,' + prodImage}}
        />
      </Left>
      <Body style={listItemStyle.body}>
        <AppText style={listItemStyle.bodyTextName} numberOfLines={2}>
          {prodName}
        </AppText>
        <AppText style={listItemStyle.bodyTextPrice} numberOfLines={1}>
          {prodPrice.toLocaleString()}원
        </AppText>
      </Body>
      <Right style={listItemStyle.right}>
        <AppText style={listItemStyle.cntText}>{qty}</AppText>
      </Right>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
  },
  viewWrap: {
    marginTop: 5,
    borderTopColor: 'rgb(240,240,240)',
    borderTopWidth: 1,
  },
  button: {
    height: 50,
    backgroundColor: 'red',
    justifyContent: 'center',
    width: '100%',
  },
  buttonText: {
    fontWeight: 'bold',
  },
  view: {
    flexDirection: 'row',
  },
  view_col: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  icon_check: {
    flex: 1,
    marginLeft: '3%',
    marginRight: '3%',
    fontSize: 90,
    color: 'rgb(240,41,28)',
  },
});

const listItemStyle = StyleSheet.create({
  list: {
    borderBottomWidth: 0,
  },
  checkboxFalse: {
    width: 15,
    height: 15,
    borderWidth: 1,
    borderColor: 'rgb(170,170,170)',
  },
  left2: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkbox: {
    fontSize: 22,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgb(170,170,170)',
  },
  body: {
    flex: 5,
  },
  bodyTextName: {
    fontSize: 15,
  },
  bodyTextPrice: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  left: {
    marginHorizontal: 10,
    width: 50,
    height: 50,
    resizeMode: 'stretch',
  },
  right: {
    flex: 1,
    width: 50,
    height: 30,
    marginRight: 18,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  cntIcon: {
    fontSize: 19,
    color: 'rgb(100,100,100)',
  },
  cntText: {
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default PaymentSuccess;
