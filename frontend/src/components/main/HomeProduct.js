/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/core';
import {Thumbnail, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {useDispatch, useSelector} from 'react-redux';
import * as mainPageApi from '../../lib/api/mainPage';
import {saveEventDetail} from '../../modules/eventProductList';
import {
  fetchBeerRanking,
  fetchIcecreamRanking,
  fetchSnackRanking,
} from '../../modules/rankingProduct';
import AppText from '../common/AppText';
import Spinner from '../common/Spinner';
import MainPopularProductItem from './MainPopularProductItem';

const HomeProduct = () => {
  const navigation = useNavigation();
  const [eventList, setEventList] = useState('');
  const dispatch = useDispatch();
  const readEvents = async () => {
    const response = await mainPageApi.readEvents();
    setEventList(response.data);
  };

  const onEventDetail = item => {
    dispatch(saveEventDetail(item.bigImage));
    navigation.navigate('EventDetailPage');
  };

  useEffect(() => {
    readEvents();
  }, []);

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

  return (
    <>
      <View>
        {eventList ? (
          <SwiperFlatList
            showPagination
            autoplayDelay={10}
            autoplayLoop={true}
            paginationStyleItem={{width: 10, height: 10}}>
            {eventList.map(item => (
              <TouchableOpacity
                key={item.id}
                onPress={() => {
                  onEventDetail(item);
                }}>
                <View style={[styles.child]}>
                  <Image style={styles.image} source={{uri: item.smallImage}} />
                </View>
              </TouchableOpacity>
            ))}
          </SwiperFlatList>
        ) : (
          <Spinner />
        )}
      </View>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <AppText style={styles.title}>인기 상품</AppText>
          <View style={styles.category}>
            <TouchableOpacity
              style={styles.categoryItem}
              onPress={() => setCategory('icecream')}>
              <View
                style={[
                  styles.circle,
                  category === 'icecream'
                    ? {borderColor: 'rgb(240,41,28)'}
                    : '',
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
          <View>
            {beer && icecream && snack ? (
              <FlatList
                style={styles.scrollContainer}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={
                  category === 'icecream'
                    ? icecream
                    : category === 'snack'
                    ? snack
                    : beer
                }
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <MainPopularProductItem item={item} rank={item.id} />
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

export default HomeProduct;

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  child: {width, justifyContent: 'center'},
  text: {fontSize: width * 0.5, textAlign: 'center'},
  image: {
    width: '100%',
    height: 190,
    resizeMode: 'stretch',
    borderRadius: 1,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 22,
  },
  subTitle: {
    fontSize: 12,
    color: 'rgb(100,100,100)',
  },
  container: {
    flex: 1,
    marginTop: '5%',
    marginLeft: '3%',
    marginRight: '3%',
  },
  subContainer: {
    marginBottom: '5%',
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
  scrollContainer: {
    marginTop: '3%',
    marginBottom: '7%',
  },
});
