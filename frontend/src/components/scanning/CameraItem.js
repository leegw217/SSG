/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Card, CardItem, Body, Text} from 'native-base';
import {Image, StyleSheet, View} from 'react-native';

const CameraItem = ({lastItem}) => {
  return (
    <>
      <Card style={styles.card}>
        <CardItem style={styles.cardItem}>
          <Body style={{flexDirection: 'row'}}>
            <Image
              source={{
                uri: 'data:image/png;base64,' + lastItem.prodImage,
              }}
              style={styles.productImg}
            />
            <View>
              <Text>{lastItem.prodName}</Text>
              <Text>{Number(lastItem.prodPrice).toLocaleString()}원</Text>
            </View>
          </Body>
        </CardItem>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  productImg: {
    borderRadius: 6,
    width: 100,
    height: '100%',
    marginRight: 10,
  },
  cardItem: {
    borderRadius: 10,
    height: 100,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  card: {
    zIndex: 5,
    width: '95%',
    borderRadius: 10,
    position: 'absolute',
    bottom: '10%',
    left: '2%',
  },
});

export default CameraItem;
