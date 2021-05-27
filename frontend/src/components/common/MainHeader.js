import {StyleSheet} from 'react-native';
import React from 'react';
import {Header} from 'native-base';
// import Icon from 'react-native-vector-icons/Ionicons';
import AppText from './AppText';

const MainHeader = () => {
  return (
    <Header androidStatusBarColor={'rgb(240,41,28)'} style={styles.header}>
      <AppText style={styles.font}>SSG/ </AppText>
      <AppText style={styles.font2}>셀프스토어</AppText>
    </Header>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgb(240,41,28)',
    height: 45,
    position: 'relative',
  },
  font: {
    fontSize: 20,
    marginLeft: 10,
    color: 'white',
    fontWeight: '700',
  },
  font2: {
    color: 'white',
    fontWeight: '700',
  },
});
export default MainHeader;
