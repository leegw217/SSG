/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import AppText from '../common/AppText';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchBeerRanking,
  fetchIcecreamRanking,
  fetchSnackRanking,
} from '../../modules/rankingProduct';
import RankingItem from './RankingItem';
import {Thumbnail} from 'native-base';
import Spinner from '../common/Spinner';

const PopularProduct = () => {
  const dispatch = useDispatch();
  const {beer, icecream, snack} = useSelector(({rankingProduct}) => ({
    beer: rankingProduct.beer,
    icecream: rankingProduct.icecream,
    snack: rankingProduct.snack,
  }));
  const [category, setCategory] = useState('icecream');

  useEffect(() => {
    dispatch(fetchBeerRanking());
    dispatch(fetchIcecreamRanking());
    dispatch(fetchSnackRanking());
  }, []);

  const renderItem = useCallback(
    ({item}) => <RankingItem item={item} rank={item.id} />,
    [],
  );

  return (
    <>
      <View style={styles.container}>
        <AppText style={styles.title}>인기 상품</AppText>
        <AppText style={styles.subTitle}>
          이번 주 가장 인기있는 상품을 만나보세요!
        </AppText>
        <View style={styles.category}>
          <TouchableOpacity
            style={styles.categoryItem}
            onPress={() => setCategory('icecream')}>
            <View
              style={[
                styles.circle,
                category === 'icecream' ? {borderColor: 'rgb(240,41,28)'} : '',
              ]}>
              <Thumbnail source={require('../../../imgs/icecream.jpg')} />
            </View>
            <AppText style={styles.categoryTxt}>아이스크림</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.categoryItem}
            onPress={() => setCategory('beer')}>
            <View
              style={[
                styles.circle,
                category === 'beer' ? {borderColor: 'rgb(240,41,28)'} : '',
              ]}>
              <Thumbnail source={require('../../../imgs/beer.jpg')} />
            </View>
            <AppText style={styles.categoryTxt}>맥주</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.categoryItem}
            onPress={() => setCategory('snack')}>
            <View
              style={[
                styles.circle,
                category === 'snack' ? {borderColor: 'rgb(240,41,28)'} : '',
              ]}>
              <Thumbnail source={require('../../../imgs/snack.jpg')} />
            </View>
            <AppText style={styles.categoryTxt}>과자</AppText>
          </TouchableOpacity>
        </View>
        {beer && icecream && snack ? (
          <FlatList
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            data={
              category === 'icecream'
                ? icecream
                : category === 'snack'
                ? snack
                : beer
            }
            keyExtractor={item => item.id}
            renderItem={renderItem}
            numColumns={2}
          />
        ) : (
          <Spinner />
        )}
      </View>
    </>
  );
};

export default PopularProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '3%',
    marginLeft: '3%',
    marginRight: '3%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  subTitle: {
    fontSize: 12,
    color: 'rgb(100,100,100)',
  },
  sectionTitle: {
    fontSize: 20,
  },
  scrollContainer: {
    width: '100%',
    marginTop: '3%',
    marginBottom: '7%',
  },
  category: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  categoryItem: {
    marginRight: 10,
    alignItems: 'center',
  },
  circle: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'rgb(255,255,255)',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  categoryTxt: {
    fontSize: 10,
  },
});
