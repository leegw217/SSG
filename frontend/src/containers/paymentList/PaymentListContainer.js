/* eslint-disable react-hooks/exhaustive-deps*/
import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {Content, View} from 'native-base';
import PaymentItem from '../../components/paymentList/PaymentItem';
import {fetchPaymentList} from '../../modules/paymentList';
import SetDurationPicker from '../../components/paymentList/SetDurationPicker';
import SetDuration from '../../components/paymentList/SetDuration';
import AppText from '../../components/common/AppText';
import Spinner from '../../components/common/Spinner';

const PaymentListContainer = () => {
  const dispatch = useDispatch();
  const {paymentList, loading} = useSelector(({paymentList}) => ({
    paymentList: paymentList.paymentList,
    loading: paymentList.loading,
  }));
  const [selectedDuration, setSelectedDuration] = useState('최근 3개월');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [page, setPage] = useState(0);
  const [curPaymentList, setCurPaymentList] = useState(null);

  const changeDateFormat = useCallback(date => {
    return (
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    );
  });

  const loadData = useCallback(() => {
    const formData = {
      memberId: 1,
      date1: changeDateFormat(startDate),
      date2: changeDateFormat(endDate),
      pageNum: page,
    };
    dispatch(fetchPaymentList(formData));
  });

  useEffect(() => {
    let date1 = new Date();
    switch (selectedDuration) {
      case '최근 3개월':
        date1.setMonth(date1.getMonth() - 3);
        break;
      case '최근 6개월':
        date1.setMonth(date1.getMonth() - 6);
        break;
      case '최근 9개월':
        date1.setMonth(date1.getMonth() - 9);
        break;
      case '최근 12개월':
        date1.setFullYear(date1.getFullYear() - 1);
        break;
    }
    setStartDate(date1);
    setEndDate(new Date());
  }, [selectedDuration]);

  useEffect(() => {
    loadData();
  }, [page]);

  useEffect(() => {
    setPage(0);
    loadData();
  }, [startDate, endDate]);

  useEffect(() => {
    if (page === 0) {
      setCurPaymentList(paymentList);
    } else {
      if (paymentList.length === 0) {
        ToastAndroid.showWithGravityAndOffset(
          '결제내역이 없습니다.',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
          25,
          100,
        );
        return;
      }
      setCurPaymentList(curPaymentList.concat(...paymentList));
    }
  }, [paymentList]);

  const renderItem = useCallback(({item}) => <PaymentItem payment={item} />);
  const keyExtractor = useCallback(item => item.id);

  return (
    <>
      <View style={styles.container}>
        <Content>
          <SetDurationPicker
            selectedDuration={selectedDuration}
            changeValue={setSelectedDuration}
          />
          <SetDuration
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
          {loading && <Spinner />}
          {curPaymentList && curPaymentList.length > 0 ? (
            <FlatList
              data={curPaymentList}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <AppText style={styles.grayText}>결제 내역이 없습니다.</AppText>
            </View>
          )}
          <TouchableOpacity
            onPress={() => {
              setPage(page + 1);
            }}>
            <View style={styles.seeMoreBtn}>
              <AppText style={styles.grayText}>더보기</AppText>
            </View>
          </TouchableOpacity>
        </Content>
      </View>
    </>
  );
};

export default PaymentListContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  seeMoreBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    marginBottom: 10,
    borderColor: 'rgb(180,180,180)',
    borderWidth: 1,
    borderRadius: 50,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    flex: 1,
  },
  grayText: {
    color: 'rgb(144,144,144)',
  },
});
