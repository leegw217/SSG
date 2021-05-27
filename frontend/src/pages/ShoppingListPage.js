import {Container} from 'native-base';
import React from 'react';
import SubHeader from '../components/common/SubHeader';
import ShoppingListContainer from '../containers/shoppingList/ShoppingListContainer';
const ShoppingListPage = ({navigation}) => {
  return (
    <Container>
      <SubHeader navigation={navigation} title={'장바구니'} />
      <ShoppingListContainer navigation={navigation} />
    </Container>
  );
};

export default ShoppingListPage;
