import axios from 'axios';

export const getBarcode = formData => {
  return axios.post('http://18.191.160.168:5000/predict', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
