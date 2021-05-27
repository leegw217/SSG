import axios from 'axios';
import * as asyncStorage from '../../AsyncStorage/asyncStorage';

const host = 'https://k4d101.p.ssafy.io/ssg';
export const loadToken = async () => {
  client.defaults.headers.common['Authorization'] = await asyncStorage.getData(
    'token',
  );
};
const client = axios.create({
  baseURL: host,
  withCredentials: true,
  // headers: {
  //   authorization: token,
  // },
});

export default client;
