import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  BarcodeScanningPage,
  MainPage,
  PaymentList,
  ShoppingListPage,
  PaymentSuccessPage,
  PaymentPage,
  ImageScanningPage,
  LoginPage,
  MyInfoPage,
  RegisterForm,
  EventDetailPage,
  LoadingPage,
} from '../pages';

const Stack = createStackNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator initialRouteName="LoadingPage">
      <Stack.Screen
        name="LoadingPage"
        component={LoadingPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginPage"
        component={LoginPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterForm"
        component={RegisterForm}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainPage"
        component={MainPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyInfoPage"
        component={MyInfoPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BarcodeScanningPage"
        component={BarcodeScanningPage}
        options={{
          headerShown: false,
          animationEnabled: false,
          // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="ImageScanningPage"
        component={ImageScanningPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PaymentList"
        component={PaymentList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ShoppingListPage"
        component={ShoppingListPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PaymentPage"
        component={PaymentPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PaymentSuccessPage"
        component={PaymentSuccessPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EventDetailPage"
        component={EventDetailPage}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default StackNav;
