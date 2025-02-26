import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';

interface IModalProps {
  setmodalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalVisible: boolean;
}
export default function Modal({ modalVisible, setmodalVisible }: IModalProps) {
  return (
    <Pressable
      style={[styles.container, { display: !modalVisible ? 'none' : 'flex' }]}
      onPress={() => setmodalVisible(false)}
    >
      <Text>Modndksdnlsaal</Text>
      <Button title='tamam' onPress={() => setmodalVisible(false)} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#33333377',
    height: '99%',
    position: 'absolute',
    width: '99%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
