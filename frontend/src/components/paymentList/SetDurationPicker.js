/* eslint-disable react-native/no-inline-styles */
import {Picker} from '@react-native-picker/picker';
import {Item} from 'native-base';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const SetDurationPicker = ({selectedDuration, changeValue}) => {
  return (
    <View style={styles.headerContainer}>
      <Item picker>
        <Picker
          mode="dropdown"
          style={{width: '60%', color: 'rgb(144, 144, 144)'}}
          selectedValue={selectedDuration}
          onValueChange={itemValue => {
            changeValue(itemValue);
          }}>
          <Picker.Item
            label="최근 3개월"
            value="최근 3개월"
            style={styles.pickerItem}
          />
          <Picker.Item
            label="최근 6개월"
            value="최근 6개월"
            style={styles.pickerItem}
          />
          <Picker.Item
            label="최근 9개월"
            value="최근 9개월"
            style={styles.pickerItem}
          />
          <Picker.Item
            label="최근 12개월"
            value="최근 12개월"
            style={styles.pickerItem}
          />
        </Picker>
      </Item>
    </View>
  );
};

export default SetDurationPicker;

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
  },
  pickerItem: {
    fontSize: 13,
    color: 'rgb(144, 144, 144)',
  },
});
