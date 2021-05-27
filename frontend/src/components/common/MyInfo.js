/* eslint-disable react-hooks/exhaustive-deps*/
import {Container, List, ListItem, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as asyncStorage from '../../AsyncStorage/asyncStorage';
import AppText from './AppText';
import Spinner from './Spinner';
import {useSelector} from 'react-redux';

const MyInfo = ({navigation}) => {
  const {userInfo} = useSelector(({userInfo})=> ({
    userInfo: userInfo,
  }));

  const logout = async () => {
    await asyncStorage.removeValue('token');
    await asyncStorage.removeValue('user');
    alert('로그아웃이 완료됐습니다.');
    navigation.navigate('LoginPage');
  };

  return (
    <Container>
      {userInfo ? (
        <>
          <View style={styles.profile}>
            <View style={styles.profileLeft}>
              <AppText style={styles.nameText}>
                {userInfo.nickname}
                <AppText style={styles.profileText}>님</AppText>
              </AppText>
              <AppText style={styles.profileText}>안녕하세요</AppText>
            </View>
            <View style={styles.profileRight}>
              <Icon style={styles.profileIcon} name={'person'} />
            </View>
          </View>
          <View style={styles.body}>
            <View flexDirection={'row'}>
              <AppText style={styles.bodyText}>고객번호</AppText>
              <AppText style={styles.bodyText2} numberOfLines={1}>
                {userInfo.memberId}
              </AppText>
            </View>
            <View flexDirection={'row'}>
              <AppText style={styles.bodyText}>계정</AppText>
              <AppText style={styles.bodyText2} numberOfLines={1}>
                {userInfo.loginId}
              </AppText>
            </View>
            <View flexDirection={'row'}>
              <AppText style={styles.bodyText}>생일</AppText>
              <AppText style={styles.bodyText2} numberOfLines={1}>
                {userInfo.birth}
              </AppText>
            </View>
            <View flexDirection={'row'}>
              <AppText style={styles.bodyText}>전화번호</AppText>
              <AppText style={styles.bodyText2} numberOfLines={1}>
                {userInfo.phone}
              </AppText>
            </View>
          </View>
          <List>
            <ListItem style={styles.listItem} onPressOut={() => logout()}>
              <AppText>로그아웃</AppText>
              <Icon name={'arrow-forward-ios'} />
            </ListItem>
          </List>
        </>
      ) : (
        <Spinner />
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  profile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 150,
  },
  profileLeft: {flex: 2, justifyContent: 'center', marginLeft: 30},
  profileRight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    fontSize: 80,
    color: 'white',
    backgroundColor: 'lightgrey',
    borderRadius: 100,
  },
  profileText: {fontSize: 30},
  nameText: {fontSize: 30, color: '#fcb326'},
  listItem: {
    justifyContent: 'space-between',
    marginRight: 20,
    marginLeft: 30,
  },
  body: {
    margin: 30,
  },
  bodyText: {
    marginBottom: 5,
    fontSize: 20,
    color: 'rgb(100,100,100)',
    width: 100,
  },
  bodyText2: {
    flex: 1,
  },
});
export default MyInfo;
