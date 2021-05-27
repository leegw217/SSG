import {Container} from 'native-base';
import React, {useEffect} from 'react';
import MainFooter from '../components/common/MainFooter';
import MainHeader from '../components/common/MainHeader';
import MainTab from '../components/common/MainTab';
import RNShake from 'react-native-shake';
import {BackHandler, ToastAndroid} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/core';

const MainPage = () => {
  const navigation = useNavigation();
  // const [isExitApp, setIsExitApp] = useState(false);
  let isExitApp = false;
  useEffect(() => {
    RNShake.addEventListener('ShakeEvent', () => {
      navigation.navigate('BarcodeScanningPage');
    });

    return () => {
      RNShake.removeEventListener('ShakeEvent');
    };
  }, []);

  const backAction = () => {
    if (isExitApp === false) {
      isExitApp = true;
      ToastAndroid.show('한번 더 누르시면 종료됩니다.', ToastAndroid.SHORT);
      setTimeout(() => {
        isExitApp = false;
      }, 5000);
    } else {
      BackHandler.exitApp();
    }
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
      <MainHeader />
      <MainTab />
      <MainFooter navigation={navigation} />
    </Container>
  );
};

export default MainPage;
