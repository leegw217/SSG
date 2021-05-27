import {combineReducers} from 'redux';
import loading from './loading';
import shoppingList from './shoppingList';
import paymentList from './paymentList';
import userInfo from './userInfo';
import payment from './payment';
import eventProductList from './eventProductList';
import rankingProduct from './rankingProduct';
import imageProduct from './imageProduct';

const rootReducer = combineReducers({
  loading,
  shoppingList,
  paymentList,
  userInfo,
  payment,
  eventProductList,
  rankingProduct,
  imageProduct,
});

export default rootReducer;
