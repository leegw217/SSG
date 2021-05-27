import client from './client';

// Email 중복 체크
export const checkEmailAddress = email => {
  return client.get('/member/checkId', {
    params: {loginId: email},
  });
};

// 핸드폰 번호 중복 체크
export const checkCellNumber = cellnumber => {
  return client.get('/member/checkPhone', {
    params: {phone: cellnumber},
  });
};

// 회원가입
export const registerUser = formData => {
  return client.post('/member/signup', formData);
};
