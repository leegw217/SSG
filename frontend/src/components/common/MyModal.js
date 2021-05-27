import {List} from 'native-base';
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';

function MyModal({isModalVisible, toggleModal}) {
  return (
    <Modal
      isVisible={isModalVisible}
      animationIn={'zoomIn'}
      animationOut={'zoomOut'}>
      <View style={styles.view}>
        <List style={styles.list}>
          <Text>1</Text>
          <Text>2</Text>
          <Text>3</Text>
          <Text>4</Text>
          <Text>5</Text>
        </List>
        <Button title="Hide modal" onPress={toggleModal} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    backgroundColor: 'white',
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default MyModal;
