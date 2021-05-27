/* eslint-disable react-hooks/exhaustive-deps*/
import React, {useCallback, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import EventProductItem from './EventProductItem';
import AppText from '../common/AppText';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchPlusOneProductList,
  fetchSaleProductList,
  fetchFreeGiftProductList,
} from '../../modules/eventProductList';
import Spinner from '../common/Spinner';

const EventProduct = () => {
  const dispatch = useDispatch();
  const {plusOne, saleProduct, freeGift} = useSelector(
    ({eventProductList}) => ({
      plusOne: eventProductList.plusOneList,
      saleProduct: eventProductList.saleList,
      freeGift: eventProductList.freeGiftList,
    }),
  );

  useEffect(() => {
    dispatch(fetchPlusOneProductList());
    dispatch(fetchSaleProductList());
    dispatch(fetchFreeGiftProductList());
  }, []);

  const keyExtractor = useCallback(item => item.id);
  const renderItem = useCallback(({item}) => (
    <EventProductItem item={item} home={false} />
  ));

  return (
    <>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <View>
            <AppText style={styles.title}>오늘의 1+1 행사 상품</AppText>
            <AppText style={styles.subTitle}>
              상품을 사면 하나 더 드려요!
            </AppText>
          </View>
          <View>
            {plusOne ? (
              <FlatList
                style={styles.scrollContainer}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={plusOne.filter(item => item.type === 1)}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
              />
            ) : (
              <Spinner />
            )}
          </View>
        </View>
        <View style={styles.subContainer}>
          <View>
            <AppText style={styles.title}>오늘의 2+1 행사 상품</AppText>
            <AppText style={styles.subTitle}>
              상품을 사면 하나 더 드려요!
            </AppText>
          </View>
          <View>
            {plusOne ? (
              <FlatList
                style={styles.scrollContainer}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={plusOne.filter(item => item.type === 2)}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
              />
            ) : (
              <Spinner />
            )}
          </View>
        </View>
        <View style={styles.subContainer}>
          <View>
            <AppText style={styles.title}>오늘의 3+1 행사 상품</AppText>
            <AppText style={styles.subTitle}>
              상품을 사면 하나 더 드려요!
            </AppText>
          </View>
          <View>
            {plusOne ? (
              <FlatList
                style={styles.scrollContainer}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={plusOne.filter(item => item.type === 3)}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
              />
            ) : (
              <Spinner />
            )}
          </View>
        </View>
        <View style={styles.subContainer}>
          <View>
            <AppText style={styles.title}>할인 행사 상품</AppText>
            <AppText style={styles.subTitle}>
              상품을 할인된 가격에 만나보세요!
            </AppText>
          </View>
          <View>
            {saleProduct ? (
              <FlatList
                style={styles.scrollContainer}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={saleProduct}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <EventProductItem item={item} home={false} />
                )}
              />
            ) : (
              <Spinner />
            )}
          </View>
        </View>
        <View style={styles.subContainer}>
          <View>
            <AppText style={styles.title}>덤 증정 상품</AppText>
            <AppText style={styles.subTitle}>
              상품을 구매하면 다른 상품이 덤!
            </AppText>
          </View>
          <View>
            {freeGift ? (
              <FlatList
                style={styles.scrollContainer}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={freeGift}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <EventProductItem item={item} home={false} />
                )}
              />
            ) : (
              <Spinner />
            )}
          </View>
        </View>
      </View>
    </>
  );
};

export default EventProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '3%',
    marginLeft: '3%',
    marginRight: '3%',
  },
  subContainer: {
    marginBottom: '10%',
    // borderBottomColor: 'rgb(220,220,220)',
    // borderBottomWidth: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 19,
  },
  subTitle: {
    fontSize: 12,
    color: 'rgb(100,100,100)',
  },
  scrollContainer: {
    marginTop: '3%',
    marginBottom: '7%',
  },
});
