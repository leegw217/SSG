import React from 'react';
import {WebView} from 'react-native-webview';
import {useSelector} from 'react-redux';
import SubHeader from '../components/common/SubHeader';
const EventDetailPage = () => {
  const {img} = useSelector(({eventProductList}) => ({
    img: eventProductList.eventDetailImg,
  }));
  return (
    <>
      <SubHeader title="이벤트 정보" isIcon={false} />
      <WebView javaScriptEnabled={false} source={{uri: img}} />
      {/* <ScrollView style={{flex: 1, backgroundColor: 'blue'}}>
        {img && (
          <Image
            source={{uri: img}}
            style={{
              width: imgSize.width,
              height: imgSize.height,
            }}></Image>
        )}
      </ScrollView> */}
    </>
  );
};
export default EventDetailPage;
