/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet} from 'react-native';
import {CardItem, Body, Thumbnail} from 'native-base';
import AppText from '../common/AppText';

const ProductItem = ({product}) => {
  return (
    <>
      <CardItem>
        <Thumbnail
          square
          source={{
            uri: 'data:image/png;base64,' + product.prodImage,
          }}
          style={styles.prodImage}
        />
        <Body style={{marginLeft: 15}}>
          <AppText style={{marginBottom: 5, ...styles.font14}}>
            {product.prodName}
          </AppText>
          <AppText style={styles.font14}>
            {Number(product.prodPrice).toLocaleString()}원 · {product.qty}개
          </AppText>
        </Body>
      </CardItem>
    </>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  font14: {
    fontSize: 14,
  },
  prodImage: {
    // flexDirection: 'row',
    width: 50,
    height: 50,
    resizeMode: 'center',
  },
});
