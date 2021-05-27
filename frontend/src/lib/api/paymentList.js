import client from './client';

export const readItems = formData => {
  return client.get('/payment/list_customer_payment', {params: {...formData}});
};
