import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ShoppingListFooter from '../../components/shoppingList/ShoppingListFooter';
import ShoppingListForm from '../../components/shoppingList/ShoppingListForm';
import {fetchShoppingList} from '../../modules/shoppingList';

const ShoppingListContainer = ({navigation}) => {
  const {shoppingList} = useSelector(({shoppingList}) => ({
    shoppingList: shoppingList,
  }));

  const dispatch = useDispatch();
  const onFetchShoppingList = () => {
    dispatch(fetchShoppingList());
  };

  useEffect(() => {
    onFetchShoppingList();
  }, []);

  return (
    <>
      <ShoppingListForm shoppingList={shoppingList} />
      <ShoppingListFooter
        navigation={navigation}
        shoppingList={shoppingList}
        sumPrice={shoppingList.sumPrice.toLocaleString()}
      />
    </>
  );
};

export default ShoppingListContainer;
