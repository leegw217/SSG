/* eslint-disable react-native/no-inline-styles */
import {Thumbnail} from 'native-base';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppText from '../common/AppText';

const RankingItem = ({item, rank}) => {
  return (
    <>
      <View style={styles.wrap}>
        <View style={styles.badge}>
          <AppText style={{color: 'white'}}>{rank}</AppText>
        </View>
        <Thumbnail
          square
          style={styles.image}
          source={{
            uri: 'data:image/png;base64,' + item.image,
          }}
        />
        <AppText numberOfLines={2} ellipsizeMode="tail" style={styles.prodName}>
          {item.prodName.trim()}
        </AppText>
      </View>
    </>
  );
};

export default RankingItem;

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    paddingRight: 8,
    paddingLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  badge: {
    backgroundColor: 'rgb(128,128,128)',
    color: 'white',
    position: 'absolute',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 6,
    borderBottomRightRadius: 6,
    top: 0,
    left: '10.5%',
    zIndex: 5,
  },
  image: {
    width: 150,
    height: 140,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  prodName: {
    marginTop: 4,
    fontSize: 13,
    height: 33,
  },
});
