import React, {useState, useRef} from 'react';
import loginImg from '../imgs/SSG_Login.png';
import {makeStyles} from '@material-ui/core/styles';
import {InputBase} from '@material-ui/core';
import * as managingAPI from '../lib/api/managing';
import {useHistory} from 'react-router-dom';
import {loadToken} from '../lib/api/client';

const useStyles = makeStyles(theme => ({
  root: {},
  header: {
    marginTop: '8%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginArea: {
    marginTop: '3%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputRoot: {
    border: '1px solid black',
    marginBottom: '1%',
    width: 300,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(2)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '35ch',
    },
  },
  loginBtn: {
    marginTop: '1%',
    backgroundColor: 'rgb(218, 41, 28)',
    borderColor: 'rgb(218, 41, 28)',
    height: 47,
    width: 300,
    fontSize: 26,
    color: 'white',
    fontFamily: 'Noto Sans CJK KR',
  },
}));

const LoginPage = () => {
  // history
  const history = useHistory();
  // css
  const classes = useStyles();

  // ID, PW
  const [adminId, setAdminId] = useState('');
  const [adminPw, setAdminPw] = useState('');

  //refs
  const adminIdRef = useRef();
  const adminPwRef = useRef();

  // handlers
  const onAdminIdHandler = e => {
    let id = e.target.value;
    setAdminId(id);
  };

  const onIdKeyPress = e => {
    if (e.key === 'Enter') {
      adminPwRef.current.focus();
    }
  };

  const onAdminPwHandler = e => {
    let pw = e.target.value;
    setAdminPw(pw);
  };

  const onPwKeyPress = e => {
    if (e.key === 'Enter') {
      onClickLoginBtn();
    }
  };

  const onClickLoginBtn = async () => {
    if (adminId === '') {
      alert('ID를 입력해주세요.');
      adminIdRef.current.focus();
      return;
    }
    if (adminPw === '') {
      alert('비밀번호를 입력해주세요.');
      adminPwRef.current.focus();
      return;
    }
    //history.push('/dashboard');
    try {
      let formData = {
        loginId: adminId,
        loginPwd: adminPw,
        grade: 0,
      };
      let response = await managingAPI.adminLogin(formData);
      if (response.status === 200) {
        sessionStorage.setItem('token', response.headers.authorization);
        await loadToken();
        history.replace('/dashboard');
      }
    } catch (e) {
      sessionStorage.removeItem('token');
      alert('로그인에 실패하였습니다. 아이디 혹은 비밀번호를 확인하세요');
    }
  };
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <img src={loginImg} width="220" height="150" alt="SSG_IMG" />
        <h1>Welcome to SSG Admin Page</h1>
      </div>
      <div className={classes.loginArea}>
        <InputBase
          inputRef={adminIdRef}
          value={adminId}
          placeholder="관리자 아이디를 입력해주세요."
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          onChange={e => onAdminIdHandler(e)}
          onKeyPress={e => onIdKeyPress(e)}
        />
        <InputBase
          inputRef={adminPwRef}
          type="password"
          placeholder="관리자 비밀번호를 입력해주세요."
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          onChange={e => onAdminPwHandler(e)}
          onKeyPress={e => onPwKeyPress(e)}
        />
        <button className={classes.loginBtn} onClick={onClickLoginBtn}>
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
