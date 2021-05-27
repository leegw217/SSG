/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Thumbnail} from 'native-base';
import {View, StyleSheet} from 'react-native';
import AppText from '../common/AppText';

const EventProductItem = ({item, home}) => {
  return (
    <>
      <View style={styles.wrap}>
        <Thumbnail
          style={styles.image}
          source={{
            uri: (home ? 'data:image/png;base64,' : '') + item.image,
          }}
        />
        <AppText style={styles.prodName}>{item.prodName.trim()}</AppText>
        {item.prodSalePrice && (
          <AppText
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.prodPrice}>
            {Number(item.prodPrice).toLocaleString()}원
          </AppText>
        )}
        {item.prodPrice && (
          <AppText
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.prodSalePrice}>
            {item.prodSalePrice
              ? Number(item.prodSalePrice).toLocaleString()
              : Number(item.prodPrice).toLocaleString()}
            원
          </AppText>
        )}
      </View>
    </>
  );
};

export default EventProductItem;

const styles = StyleSheet.create({
  wrap: {
    width: 150,
    height: '100%',
    paddingRight: 8,
    paddingLeft: 8,
  },
  image: {
    width: 140,
    height: 140,
    resizeMode: 'stretch',
    borderRadius: 10,
  },
  prodName: {
    marginTop: 5,
    height: 30,
    fontSize: 12,
    width: 130,
  },
  prodPrice: {
    fontSize: 11,
    marginTop: 5,
    textDecorationLine: 'line-through',
    color: 'rgb(144,144,144)',
  },
  prodSalePrice: {
    fontSize: 14,
    fontWeight: '700',
  },
});
