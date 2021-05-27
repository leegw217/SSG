import client from './client';

// 최근 판매 리스트, 페이징
export const getRecentOrder = (date, pageNum) => {
  return client.get(`/admin/payments_one_date?date=${date}&pageNum=${pageNum}`);
};

// 관리자 로그인
export const adminLogin = formData => {
  return client.post('/member/login', formData);
};

// 유저 검색 구매리스트 호출 (기간설정)
export const getCostomerPaymentList = (date1, date2, loginId, pageNum) => {
  return client.get(
    `/admin/payments_date?date1=${date1}&date2=${date2}&loginId=${loginId}&pageNum=${pageNum}`,
  );
};

// 유저 검색 구매리스트 호출 (전체 기간)
export const getCostomerAllPaymentList = (loginId, pageNum) => {
  return client.get(
    `/admin/payments_all?loginId=${loginId}&pageNum=${pageNum}`,
  );
};

// 해당 날짜 전체 구매리스트 호출
export const getCostomerAllPaymentListByDate = date => {
  return client.get(`/admin/payments_one_date_all?date=${date}`);
};
