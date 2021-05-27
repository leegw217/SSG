import client from './client';

export const requestPayment = formData => {
  return client.post('/payment/pay', formData);
};

export const resultPayment = formData => {
  return client.post('/payment/pay_result', formData);
};
