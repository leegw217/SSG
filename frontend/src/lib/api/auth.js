import client from './client';

// 로그인 시도
export const LoginWithPassword = formData => {
  return client.post('/member/login', formData);
};

// 자동 로그인 토큰 검사
export const checkTokenForAutoLogin = token => {
  // return client.post('/', token);
};

// 회원 정보 가져오기
export const getUserInfo = token => {
  return client.post(`/token=${token}`);
};

// 로그 아웃
export const logout = token => {
  return client.post(`/token=${token}`);
};

// import client from './client';

// export const check = () => client.get('/api/auth/check');

// export const getUserInfo = (token) => client.get('/user/getToken/' + token);

// export const getUsername = (userId) =>
//   client.get('/user/getUsername', { params: { seq: userId } });

// export const logout = () => '()';
// // export const logout = () => client.post('/user/logout');
