import React, {useState, useRef} from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import SubHeader from '../components/common/SubHeader';
import * as registerAPI from '../lib/api/register';
import AppText from '../components/common/AppText';

const RegisterForm = ({navigation}) => {
  // 유저 정보
  // 아이디
  const [idCheck, setIdCheck] = useState(false);
  const [id, setId] = useState('');
  const [isduplicated_id, setDid] = useState(false);

  // 닉네임
  const [nickName, setNickName] = useState('');

  // 생일
  const [birthCheck, setbirthCheck] = useState(false);
  const [birth, setBirth] = useState('');

  // 비밀번호
  const [pwCheck, setPwCheck] = useState(false);
  const [pwFormCheck, setpwFormCheck] = useState(false);
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');

  // 휴대전화
  const [cellnumber, setCellNum] = useState('');
  const [cellCheck, setCellCheck] = useState(false);
  const [isduplicated_cell, setDcell] = useState(false);

  // 빈칸 관리
  const [idBlank, setIdBlank] = useState(true);
  const [birthBlank, setBirthBlank] = useState(true);
  const [pwFormBlank, setPwFormBlank] = useState(true);
  const [pwBlank, setPwBlank] = useState(true);
  const [cellBlank, setCellBlank] = useState(true);

  // Refs
  const idRef = useRef();
  const birthRef = useRef();
  const pwRef = useRef();
  const pwConfirmRef = useRef();
  const phoneRef = useRef();
  const nickNameRef = useRef();

  // 아이디 입력 확인
  const onIdInputHandler = text => {
    let inputid = text;
    setId(inputid);
    setIdCheck(false);
    if (inputid === '') {
      setIdBlank(true);
      return;
    }
    setIdBlank(false);
  };

  // 아이디 중복 체크
  const onIdCheckHandler = async () => {
    if (id === '') {
      Alert.alert('ID 확인', 'ID를 입력해주세요.', [
        {
          text: '확인',
          onPress: () => idRef.current.focus(),
        },
      ]);
      return;
    }

    // 이메일 형식 체크
    let reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

    if (!reg_email.test(id)) {
      Alert.alert('ID 확인', 'Email의 형식을 확인해주세요!.', [
        {
          text: '확인',
          onPress: () => console.log('email check'),
        },
      ]);
      return;
    }

    // back에 아이디 있는지 확인 체크
    const response = await registerAPI.checkEmailAddress(id);
    if (response.data === 'success') {
      setIdCheck(true);
      setDid(false);
    } else {
      Alert.alert('ID 확인', '중복된 Email입니다!.', [
        {
          text: '확인',
          onPress: () => console.log('email check'),
        },
      ]);
      return;
    }
  };

  // 닉네임 입력
  const onNickNameHandler = text => {
    let inNick = text;
    inNick = inNick.replace(/\s/, '');
    inNick = inNick.replace(/[!~@#$%^*()\-_=+\\\|\[\]{};:\'",.<>\/?]/, '');
    setNickName(inNick);
  };

  // 생일 입력 체크
  const onBirthCheckHandler = text => {
    let inbirth = text;
    setBirth(inbirth);

    if (inbirth === '') {
      setBirthBlank(true);
      return;
    }
    const regex = /^[0-9]{0,8}$/;
    if (!regex.test(inbirth)) {
      inbirth = inbirth.replace(/[-,. a-zA-Z]/g, '');
      setBirth(inbirth);
      setbirthCheck(false);
      return;
    }

    setBirthBlank(false);
    if (inbirth.length != 8) {
      setbirthCheck(false);
      return;
    }

    inbirth = inbirth.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
    setBirth(inbirth);

    let year = Number(inbirth.substr(0, 4));
    let month = Number(inbirth.substr(5, 2));
    let day = Number(inbirth.substr(8, 2));
    let today = new Date(); // 날짜 변수 선언
    let yearNow = today.getFullYear(); // 올해 연도 가져옴

    if (year < 1900 || year >= yearNow) {
      setBirth('');
      Alert.alert(
        '생일 확인',
        '년도를 확인해주세요. ' +
          '\n' +
          '(1900 ~ ' +
          yearNow +
          ' 까지 입력 가능합니다.',
        [
          {
            text: '확인',
            onPress: () => console.log('confirm Pressed'),
          },
        ],
      );
      setbirthCheck(false);
      return;
    }
    if (month < 1 || month > 12) {
      setBirth('');
      Alert.alert('생일 확인', '달은 1월부터 12월까지 입력 가능합니다.', [
        {
          text: '확인',
          onPress: () => console.log('confirm Pressed'),
        },
      ]);
      setbirthCheck(false);
      return;
    }
    if (day < 1 || day > 31) {
      setBirth('');
      Alert.alert('생일 확인', '일은 1일부터 31일까지 입력가능합니다.', [
        {
          text: '확인',
          onPress: () => console.log('confirm Pressed'),
        },
      ]);
      setbirthCheck(false);
      return;
    }
    if ((month == 4 || month == 6 || month == 9 || month == 11) && day == 31) {
      setBirth('');
      Alert.alert('생일 확인', month + '월은 31일이 존재하지 않습니다.', [
        {
          text: '확인',
          onPress: () => console.log('confirm Pressed'),
        },
      ]);
      setbirthCheck(false);
      return;
    }

    setbirthCheck(true);
    setBirth(inbirth);
  };

  // 비밀번호 양식 체크
  const onPasswordHandler = text => {
    let pw = text;
    setPassword(pw);

    if (pw !== confirm_password) {
      setPwCheck(false);
    } else {
      setPwCheck(true);
    }

    if (text === '') {
      setPwFormBlank(true);
      return;
    }

    setPwFormBlank(false);

    let num = pw.search(/[0-9]/g);

    let eng = pw.search(/[a-zA-Z]/gi);

    let spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

    if (pw.length < 8 || pw.length > 20) {
      // 길이 체크
      setpwFormCheck(false);
      return;
    }

    if (pw.search(/ /) != -1) {
      // 공백 여부 체크
      setpwFormCheck(false);
      return;
    }
    if (num < 0 || eng < 0 || spe < 0) {
      // 특수문자 체크
      setpwFormCheck(false);
      return;
    }
    // 가능
    setpwFormCheck(true);
  };

  // 비밀번호 확인
  const onPasswordConfirmHandler = text => {
    let confirmPw = text;
    setConfirmPassword(confirmPw);
    if (text === '') {
      setPwCheck(false);
      setPwBlank(true);
      return;
    }

    setPwBlank(false);

    if (confirmPw !== password) {
      setPwCheck(false);
      return;
    }
    setPwCheck(true);
  };

  // 휴대전화 입력
  const onCellInputHandler = text => {
    let cell = text;
    setCellNum(cell);
    setCellCheck(false);
    if (cell === '') {
      setCellBlank(true);
      return;
    }
    const regex = /^[0-9]{0,11}$/;
    if (!regex.test(cell)) {
      cell = cell.replace(/[-,. a-zA-Z]/g, '');
      setCellNum(cell);
      return;
    }

    if (cell.length === 11) {
      cell = cell.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
      setCellNum(cell);
    }

    setCellBlank(false);
  };
  // 휴대전화 중복 체크
  const onCellCheckHandler = async () => {
    if (cellnumber === '') {
      Alert.alert('번호 확인', '휴대 전화 번호를 입력해주세요!', [
        {
          text: '확인',
          onPress: () => phoneRef.current.focus(),
        },
      ]);
      setCellBlank(true);
      return;
    }
    if (cellnumber.length != 13) {
      Alert.alert('번호 확인', '휴대 전화 번호를 확인해주세요!', [
        {
          text: '확인',
          onPress: () => phoneRef.current.focus(),
        },
      ]);
      phoneRef.current.focus();
      return;
    }
    // back에 휴대전화 있는지 확인 체크
    const response = await registerAPI.checkCellNumber(cellnumber);
    if (response.data === 'success') {
      setCellCheck(true);
      setDcell(false);
    } else {
      Alert.alert('번호 확인', '중복된 휴대 전화 번호입니다!.', [
        {
          text: '확인',
          onPress: () => console.log('email check'),
        },
      ]);
    }
  };

  // 모든 정보가 제대로 입력되었는지 확인
  const checkAllRegisterInfoHandler = async () => {
    if (!idCheck) {
      Alert.alert('ID 확인', 'ID 중복 체크를 해주세요!', [
        {
          text: '확인',
          onPress: () => idRef.current.focus(),
        },
      ]);
      return;
    }
    if (nickName.length === 0) {
      Alert.alert('닉네임 확인', '닉네임을 확인 해주세요!', [
        {
          text: '확인',
          onPress: () => nickNameRef.current.focus(),
        },
      ]);
      return;
    }
    if (!birthCheck) {
      Alert.alert('생일 확인', '생일을 확인 해주세요!', [
        {
          text: '확인',
          onPress: () => birthRef.current.focus(),
        },
      ]);
      return;
    }
    if (!pwFormCheck) {
      Alert.alert('비밀번호 확인', '비밀번호 양식을 확인 해주세요!', [
        {
          text: '확인',
          onPress: () => pwRef.current.focus(),
        },
      ]);
      return;
    }
    if (!pwCheck) {
      Alert.alert('비밀번호 확인', '비밀번호가 같은지 확인 해주세요!', [
        {
          text: '확인',
          onPress: () => pwConfirmRef.current.focus(),
        },
      ]);
      return;
    }
    if (!cellCheck) {
      Alert.alert('전화 번호 확인', '휴대전화 중복 체크를 해주세요!', [
        {
          text: '확인',
          onPress: () => phoneRef.current.focus(),
        },
      ]);
      return;
    }

    // Back 통신
    try {
      const response = await registerAPI.registerUser({
        loginId: id,
        nickname: nickName,
        birth: birth,
        loginPwd: password,
        phone: cellnumber,
      });

      if (response.status === 200) {
        Alert.alert('완벽합니다!', '환영합니다! 회원가입에 성공했습니다!', [
          {
            text: '확인',
            onPress: () => {
              navigation.navigate('LoginPage');
            },
          },
        ]);
      } else {
        Alert.alert(
          '문제가!!!',
          '무언가 문제가 일어났습니다!' + '\n' + '다시 시도해주세요',
          [
            {
              text: '확인',
              onPress: () => console.log('confirm Pressed'),
            },
          ],
        );
      }
    } catch (e) {
      Alert.alert(
        '문제가!!!',
        '무언가 문제가 일어났습니다!' + '\n' + '다시 시도해주세요',
        [
          {
            text: '확인',
            onPress: () => console.log('confirm Pressed'),
          },
        ],
      );
    }
  };

  return (
    <>
      <SubHeader title={'회원가입'} navigation={navigation} isIcon={false} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.inputForm}>
          <View>
            <AppText style={styles.titleText}>ID(Email)</AppText>
            <View style={styles.inputWithBtnArea}>
              <TextInput
                ref={idRef}
                autoCompleteType={'email'}
                keyboardType={'email-address'}
                returnKeyType="done"
                style={styles.inputWithBtn}
                placeholder="example@gmail.com"
                onChangeText={text => onIdInputHandler(text)}
              />
              <TouchableOpacity
                style={styles.CheckBtn}
                onPress={onIdCheckHandler}>
                <AppText style={styles.btnText}>중복체크</AppText>
              </TouchableOpacity>
            </View>
            <View>
              {idBlank ? null : idCheck ? (
                isduplicated_id ? ( // 중복 여부
                  <AppText style={styles.afterCheck}>
                    ID가 중복되었습니다!
                  </AppText>
                ) : (
                  <AppText style={styles.afterCheck}>
                    사용가능한 ID 입니다!
                  </AppText>
                )
              ) : (
                // 중복체크
                <AppText style={styles.preCheck}>
                  ID 중복체크를 해주세요.
                </AppText>
              )}
            </View>
          </View>
          <View>
            <AppText style={styles.titleText}>닉네임</AppText>
            <TextInput
              ref={nickNameRef}
              style={[styles.textInput, {marginBottom: 6}]}
              returnKeyType="next"
              onSubmitEditing={() => birthRef.current.focus()}
              maxLength={7}
              placeholder="특수문자를 제외한 7자리"
              onChangeText={text => onNickNameHandler(text)}
              value={nickName}
            />
          </View>
          <View>
            <AppText style={styles.titleText}>생일</AppText>
            <TextInput
              ref={birthRef}
              style={[styles.textInput, {marginBottom: 6}]}
              keyboardType={'numeric'}
              returnKeyType="next"
              onSubmitEditing={() => pwRef.current.focus()}
              maxLength={10}
              placeholder="생년월일(19910622)"
              onChangeText={text => onBirthCheckHandler(text)}
              value={birth}
            />
            {birthBlank ? null : birthCheck ? null : (
              <AppText style={styles.afterCheck}>생일을 확인해주세요</AppText>
            )}
          </View>
          <View>
            <AppText style={styles.titleText}>비밀 번호</AppText>
            <TextInput
              ref={pwRef}
              style={styles.textInput}
              onChangeText={text => onPasswordHandler(text)}
              onSubmitEditing={() => pwConfirmRef.current.focus()}
              placeholder="영문,숫자,특수문자를 포함한 8~20자리"
              returnKeyType="next"
              secureTextEntry={true}
            />
            <View>
              {pwFormBlank ? null : pwFormCheck ? (
                <AppText style={styles.afterCheck}>
                  사용가능한 비밀번호입니다!
                </AppText>
              ) : (
                <AppText style={styles.afterCheck}>
                  비밀번호 양식을 확인해주세요
                </AppText>
              )}
            </View>
            <AppText style={styles.titleText}>비밀 번호 확인</AppText>
            <TextInput
              ref={pwConfirmRef}
              style={[styles.textInput, {marginBottom: 10}]}
              placeholder="다시 한번 입력해주세요"
              returnKeyType="next"
              secureTextEntry={true}
              onChangeText={text => {
                onPasswordConfirmHandler(text);
              }}
              onSubmitEditing={() => phoneRef.current.focus()}
            />
            <View>
              {pwBlank ? null : pwCheck ? (
                <AppText style={styles.afterCheck}>확인되었습니다!</AppText>
              ) : (
                <AppText style={styles.preCheck}>
                  비밀번호가 일치하지 않습니다!
                </AppText>
              )}
            </View>
          </View>
          <AppText style={styles.titleText}>휴대 전화</AppText>
          <View style={styles.inputWithBtnArea}>
            <TextInput
              ref={phoneRef}
              style={styles.inputWithBtn}
              keyboardType={'numeric'}
              returnKeyType="done"
              maxLength={13}
              value={cellnumber}
              placeholder="휴대폰 번호를 입력해주세요."
              onChangeText={text => {
                onCellInputHandler(text);
              }}
            />
            <TouchableOpacity
              style={styles.CheckBtn}
              onPress={onCellCheckHandler}>
              <AppText style={styles.btnText}>중복체크</AppText>
            </TouchableOpacity>
          </View>
          <View>
            {cellBlank ? null : cellCheck ? (
              isduplicated_cell ? (
                <AppText style={styles.preCheck}>
                  휴대전화가 중복되었습니다.
                </AppText>
              ) : (
                <AppText style={styles.afterCheck}>
                  사용가능한 번호입니다!
                </AppText>
              )
            ) : (
              <AppText style={styles.preCheck}>
                휴대전화 중복체크를 해주세요.
              </AppText>
            )}
          </View>
        </View>
        <View style={styles.registerBtnArea}>
          <TouchableOpacity
            style={styles.registerBtn}
            onPress={checkAllRegisterInfoHandler}>
            <AppText style={styles.registerText}>회원가입</AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: '5%',
    marginRight: '5%',
  },
  inputForm: {
    paddingTop: '20%',
  },
  textInput: {
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    height: 40,
    borderColor: 'rgb(226,226,226)',
    marginBottom: 10,
  },
  inputWithBtn: {
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    height: 40,
    borderColor: 'rgb(226,226,226)',
    marginBottom: 10,
    width: '77%',
  },
  preCheck: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgb(218, 41, 28)',
    marginBottom: 20,
  },
  afterCheck: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgb(218, 41, 28)',
    marginBottom: 20,
  },
  titleText: {
    fontSize: 18,
    marginBottom: 3,
  },
  inputWithBtnArea: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  CheckBtn: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(218, 41, 28)',
    marginBottom: 10,
    marginLeft: 10,
  },
  btnText: {
    fontSize: 13,
    color: 'white',
    margin: 6,
  },
  registerBtnArea: {
    marginTop: 80,
    marginBottom: 10,
  },
  registerBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(218, 41, 28)',
    height: 50,
  },
  registerText: {
    fontSize: 26,
    color: 'white',
  },
});
