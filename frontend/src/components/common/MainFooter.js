import {Footer, FooterTab} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import IconFntAwesome from 'react-native-vector-icons/FontAwesome5';
import IconAntD from 'react-native-vector-icons/AntDesign';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AppText from './AppText';
import {useNavigation} from '@react-navigation/native';

const MainFooter = ({}) => {
  const navigation = useNavigation();
  return (
    <Footer style={styles.footer}>
      <FooterTab style={styles.container}>
        <TouchableOpacity
          style={styles.tochablePosition}
          onPress={() => {
            navigation.navigate('MainPage');
          }}>
          <IconFntAwesome name="home" size={26} style={styles.grayText} />
          <AppText style={styles.gray10Text}>홈</AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tochablePosition}
          onPress={() => {
            navigation.navigate('PaymentList');
          }}>
          <IconFntAwesome name="clipboard" size={25} style={styles.grayText} />
          <AppText style={styles.gray10Text}>결제내역</AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tochableBarcode}
          onPress={() => {
            navigation.navigate('BarcodeScanningPage');
          }}>
          <IconMaterial name="barcode-scan" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tochablePosition}
          onPress={() => {
            navigation.navigate('ShoppingListPage');
          }}>
          <IconAntD name="shoppingcart" size={30} style={styles.grayText} />
          <AppText style={styles.gray10Text}>장바구니</AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tochablePosition}
          onPress={() => {
            navigation.navigate('MyInfoPage');
          }}>
          <IconFntAwesome
            name="user-circle"
            size={28}
            style={styles.grayText}
          />
          <AppText style={styles.gray10Text}>내정보</AppText>
        </TouchableOpacity>
      </FooterTab>
    </Footer>
  );
};

export default MainFooter;

const styles = StyleSheet.create({
  footer: {
    height: 63,
    backgroundColor: 'white',
  },
  container: {
    height: '100%',
    width: '100%',
    paddingLeft: '4%',
    paddingRight: '4%',
    borderTopWidth: 0.7,
    borderColor: 'rgb(230,230,230)',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tochablePosition: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tochableBarcode: {
    top: -10,
    backgroundColor: 'rgb(240,41,28)',
    borderRadius: 100,
    width: 58,
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gray10Text: {
    color: 'rgb(91, 103, 112)',
    fontSize: 10,
  },
  grayText: {
    color: 'rgb(91, 103, 112)',
  },
});
