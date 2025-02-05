import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { storage } from '../app/(screens)/_layout';
import useToast from '../utils/useToast';

const Konsol = () => {
  const [input, setinput] = useState('');

  const themeColor = storage.getString('theme-color') || 'skyblue';

  // onEndEditing function
  const handleEndEditing = () => {
    let define = ['', ''];
    if (input.includes('~')) define = input.trim().split('~');

    if (input.trim().slice(2, 5) === 'dgg') {
      // RELIGIOUS DAYS NIGHTS
      storage.set('holy-days-nights', input.trim());
      useToast('Dini Günler Güncellendi');
      setinput('');
    } else if (define[0].trim().toLowerCase() === 'isha message') {
      // ISHA MESSAGE
      storage.set('isha-message', define[1].trim());
      useToast('Yatsı Mesajı Güncellendi');
      setinput('');
    } else if (input.trim().slice(0, 4) === 'http') {
      // BACKGROUND IMAGE START
      storage.set('bg-img-URL', input.trim());
      setinput('');
    } else if (input.trim().toLowerCase() === 'varsayılan') {
      storage.set('bg-img-URL', '');
      setinput('');
      // BACKGROUND IMAGE END
    } else if (define[0].trim().toLowerCase() === 'notification body message') {
      // NOTIFICATION BODY MESSAGE
      storage.set('notification-body-message', define[1].trim());
      useToast('notification-body-message');
      setinput('');
    } else if (define[0].trim().toLowerCase() === 'sponsor of the city') {
      // SET SPONSOR OF THE CITY
      storage.set('sponsor-of-the-city', define[1].trim());
      useToast('sponsor-of-the-city');
      setinput('');
    } else if (input.trim().toLowerCase() === 'i am sure to reset storage') {
      // CLEAR STORAGE
      storage.clearAll();
      useToast('Hafıza temizlendi.');
      setinput('');
    } else if (input.trim().toLowerCase() === 'notifications') {
      // NOTIFICATIONS
      // setNotificationArguments(getParsedPrayerTimes());
      setinput('');
    } else if (input.trim().toLowerCase() === 'cancel notifications') {
      // CANCEL NOTIFICATIONS
      // cancelTrigger();
      setinput('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, { borderColor: themeColor }]}
        onChangeText={(text) => setinput(text)}
        onEndEditing={handleEndEditing}
        value={input}
      />
      {/* <TextInput
        style={styles.input}
        onChangeText={setinput}
        value={input}
        placeholder="Enter text or URL"
        keyboardType="default"
        textAlign="center"
        multiline={true}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },

  input: {
    textAlign: 'center',
    padding: 1,
    borderWidth: 1,
    borderRadius: 20,
    width: '80%',
    color: 'white',
  },
});

export default Konsol;
