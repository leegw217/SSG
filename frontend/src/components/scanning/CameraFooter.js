/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet} from 'react-native';
import {Footer, FooterTab, Button, Badge} from 'native-base';
import IconAntD from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import AppText from '../common/AppText';

export const CameraFooter = ({sumPrice, qtyProduct}) => {
  const navigation = useNavigation();

  return (
    <>
      <Footer>
        <FooterTab style={styles.footer}>
          <AppText style={{...styles.footerText, ...styles.footerText1}}>
            결제예정금액
          </AppText>
          <AppText style={{...styles.footerText, width: '50%'}}>
            {Number(sumPrice).toLocaleString()}원
          </AppText>
          <Button
            style={styles.goToCartBtn}
            onPress={() => {
              navigation.navigate('ShoppingListPage');
            }}>
            <Badge style={styles.qtyCart}>
              <AppText style={{color: 'rgb(255,255,255)', fontSize: 11}}>
                {qtyProduct}
              </AppText>
            </Badge>
            <IconAntD name="shoppingcart" size={40} color="rgb(218, 41, 28)" />
          </Button>
        </FooterTab>
      </Footer>
    </>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: 'rgb(218, 41, 28)',
    height: '100%',
  },
  footerText: {
    color: 'rgb(255,255,255)',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    height: '100%',
    textAlignVertical: 'center',
  },
  footerText1: {
    fontSize: 18,
    marginLeft: 10,
    width: '30%',
    height: '100%',
    fontFamily: 'NotoSansCJKkr-Black',
  },
  goToCartBtn: {
    backgroundColor: 'rgb(255,255,255)',
    borderRadius: 0,
    height: '100%',
  },
  qtyCart: {
    backgroundColor: 'rgb(0, 0, 0)',
    transform: [{scaleX: 0.9}, {scaleY: 0.8}],
    alignItems: 'center',
    alignContent: 'center',
    position: 'absolute',
    left: '56%',
    bottom: '60%',
    zIndex: 5,
  },
});
