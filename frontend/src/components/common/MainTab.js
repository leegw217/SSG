import {Container, ScrollableTab, Tab, Tabs} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import HomeProduct from '../main/HomeProduct';
import EventProduct from '../main/EventProduct';
import PopularProduct from '../main/PopularProduct';
import VirtualizedView from '../common/VirtualizedView';

const ProductListTab = () => {
  const renderTabBar = props => {
    props.tabStyle = Object.create(props.tabStyle);
    return <ScrollableTab {...props} />;
  };

  return (
    <Container>
      <Tabs
        tabBarUnderlineStyle={styles.bgcRed}
        tabBarBackgroundColor="white"
        locked={true}
        renderTabBar={renderTabBar}>
        <Tab
          activeTabStyle={styles.bgcWhite}
          activeTextStyle={[styles.tabTxt, styles.boldTxt]}
          textStyle={styles.tabTxt}
          tabStyle={styles.bgcWhite}
          heading="홈">
          <VirtualizedView>
            <HomeProduct />
          </VirtualizedView>
        </Tab>
        <Tab
          activeTabStyle={styles.bgcWhite}
          activeTextStyle={[styles.tabTxt, styles.boldTxt]}
          textStyle={styles.tabTxt}
          tabStyle={styles.bgcWhite}
          heading="행사 상품">
          <VirtualizedView>
            <EventProduct />
          </VirtualizedView>
        </Tab>
        <Tab
          activeTabStyle={styles.bgcWhite}
          activeTextStyle={[styles.tabTxt, styles.boldTxt]}
          textStyle={styles.tabTxt}
          tabStyle={styles.bgcWhite}
          heading="인기 상품">
          <VirtualizedView>
            <PopularProduct />
          </VirtualizedView>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default ProductListTab;

const styles = StyleSheet.create({
  bgcRed: {
    backgroundColor: 'rgb(240,41,28)',
  },
  bgcWhite: {
    backgroundColor: 'rgb(255,255,255)',
  },
  tabTxt: {
    color: 'black',
    fontFamily: 'NotoSansCJKkr-Regular',
  },
  boldTxt: {
    fontWeight: '700',
  },
});
