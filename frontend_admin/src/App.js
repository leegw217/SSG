import React, {useEffect} from 'react';
import {Route, useHistory} from 'react-router-dom';
import {loadToken} from './lib/api/client';
import {SearchPage, Dashboard, LoginPage} from './pages';

function App() {
  const history = useHistory();
  const loadTokenWhenMount = async () => {
    console.log('새로호출');
    // 토큰 있는 경우.. ex 새로고침, 뒤로가기
    if (sessionStorage.getItem('token')) {
      await loadToken();
    }
  };

  loadTokenWhenMount();

  useEffect(() => {
    // 토큰 없는 상황
    if (!sessionStorage.getItem('token')) {
      if (
        // 도착 혹은 가려는 곳이 로그인
        history.location.pathname === '/login' ||
        history.location.pathname === '/'
      ) {
        return;
      }
      alert('관리자 로그인이 필요합니다.');
      history.replace('/login');
    }
  }, [history.location.pathname]);

  return (
    <>
      <Route component={LoginPage} path={['/', '/login']} exact />
      <Route component={Dashboard} path={['/dashboard']} exact />
      <Route component={SearchPage} path={['/search']} exact />
    </>
  );
}

export default App;
