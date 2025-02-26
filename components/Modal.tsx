import {
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { storage } from '../app/(screens)/_layout';

interface IModalProps {
  setmodalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalVisible: boolean;
}
export default function Modal({ modalVisible, setmodalVisible }: IModalProps) {
  const [selectedValue, setselectedValue] = useState(0);

  function handleSelect(nmbr: number) {
    setselectedValue(nmbr);
    // storage.set("dmsşlfmds", nmbr)
    // if (nmbr === 0) storage.delete('dmsşlfmds');
  }

  return (
    <Pressable
      style={[styles.container, { display: !modalVisible ? 'none' : 'flex' }]}
      onPress={() => setmodalVisible(false)}
    >
      <Text style={styles.text}>Modndksdnlsaal</Text>
      <Text style={styles.text}>{selectedValue}</Text>

      <View style={styles.scrollViewContainer}>
        <ScrollView pagingEnabled>
          {nmbrs.map((nmbr) => (
            <Pressable
              key={nmbr}
              style={styles.scrollItem}
              onPress={() => handleSelect(nmbr)}
            >
              <Text style={styles.scrollText}>{nmbr}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <Button title='tamam' onPress={() => setmodalVisible(false)} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#fff',
    backgroundColor: '#33333377',
    height: '99%',
    position: 'absolute',
    width: '99%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContainer: {
    // backgroundColor: '#0f0',
    height: 44,
    width: '55%',
    margin: 33,
  },
  scrollItem: {
    height: 44,
    justifyContent: 'center',
    // alignItems: 'center',
    // marginVertical: 5,
  },
  scrollText: {
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderColor: 'white',
    fontSize: 22,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    padding: 5,
  },
  text: {
    fontSize: 22,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    padding: 5,
  },
});

const nmbrs = [
  -11, -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
];
