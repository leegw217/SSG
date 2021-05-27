import client from './client';

export const readPlusOneProductList = () => {
  return client.get('/event/get_plus');
};

export const readSaleProductList = () => {
  return client.get('/event/get_sale');
};

export const readFreeGiftProductList = () => {
  return client.get('/event/get_dum');
};

export const readBeerRanking = () => {
  return client.get('/event/get_beer');
};

export const readIcecreamRanking = () => {
  return client.get('/event/get_icecream');
};

export const readSnackRanking = () => {
  return client.get('/event/get_snack');
};

export const readEvents = formData => {
  return client.get('/event/get_events', formData);
};
