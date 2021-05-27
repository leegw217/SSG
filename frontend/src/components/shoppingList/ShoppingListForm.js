import {Header, List, Right} from 'native-base';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {
  allCheckShoppingListItem,
  deleteShoppingListItem,
} from '../../modules/shoppingList';
import AppText from '../common/AppText';
import ShoppingListItem from './ShoppingListItem';
import Spinner from '../common/Spinner';

const ShoppingListForm = ({shoppingList}) => {
  const [checkCnt, setCheckCnt] = useState(0);
  const [prodIds, setProdIds] = useState([]);
  const [allChecked, setAllchecked] = useState(false);

  useEffect(() => {
    if (shoppingList.paymentDetail === null) {
      return;
    }
    let list = [];
    let cnt = 0;
    for (let item of shoppingList.paymentDetail) {
      if (item.isCheck === true) {
        cnt = cnt + 1;
        list.push(item.prodId);
      }
    }
    setProdIds(list);
    setCheckCnt(cnt);
  }, [shoppingList]);

  const dispatch = useDispatch();
  const onDelete = () => {
    if (checkCnt === 0) {
      return;
    }
    dispatch(deleteShoppingListItem({memberId: 1, prodIds}));
    setAllchecked(false);
  };
  const onAllChecked = () => {
    dispatch(allCheckShoppingListItem(!allChecked));
    setAllchecked(!allChecked);
  };
  return (
    <>
      <Header androidStatusBarColor={'rgb(240,41,28)'} style={styles.header}>
        <TouchableOpacity style={styles.headerLeft} onPress={onAllChecked}>
          {allChecked ? (
            <Icon name={'check-box-outline'} style={styles.checkbox} />
          ) : (
            <Icon name={'checkbox-blank-outline'} style={styles.checkbox} />
          )}
          <AppText style={styles.headerLeftText}>{checkCnt}개 선택</AppText>
        </TouchableOpacity>
        <Right>
          <TouchableOpacity onPress={onDelete}>
            <AppText style={styles.headerRightText}>상품 삭제</AppText>
          </TouchableOpacity>
        </Right>
      </Header>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <List>
          {shoppingList.paymentDetail ? (
            shoppingList.paymentDetail.map(item => (
              <ShoppingListItem key={item.prodId} {...item} />
            ))
          ) : (
            <Spinner />
          )}
        </List>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  checkboxFalse: {
    width: 15,
    height: 15,
    borderWidth: 1,
    borderColor: 'rgb(130,130,130)',
  },
  checkbox: {
    fontSize: 21,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgb(170,170,170)',
  },
  header: {
    marginTop: 5,
    marginBottom: 3,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: 'white',
    borderTopColor: 'black',
  },
  headerLeftText: {
    marginLeft: 10,
    color: 'rgb(130,130,130)',
  },
  headerLeft: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: 8,
  },
  headerRightText: {
    color: 'rgb(130,130,130)',
    marginRight: 10,
  },
});
export default ShoppingListForm;
