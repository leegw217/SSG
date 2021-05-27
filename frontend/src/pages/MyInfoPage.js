import {Container} from 'native-base';
import React from 'react';
import MyInfo from '../components/common/MyInfo';
import SubHeader from '../components/common/SubHeader';
import MainFooter from '../components/common/MainFooter';

const MyInfoPage = ({navigation}) => {
  return (
    <Container>
      <SubHeader title={'내 정보'} isIcon={false} />
      <MyInfo navigation={navigation} />
      <MainFooter />
    </Container>
  );
};

export default MyInfoPage;
