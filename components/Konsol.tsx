import React, { memo, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { storage } from '../app/(screens)/_layout';
import useToast from '../utils/useToast';
import { useRouter } from 'expo-router';

const Konsol = ({ themeColor }: { themeColor: string }) => {
  const [input, setinput] = useState('');
  const router = useRouter();

  // handleEndEditing function
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
      router.setParams({ updateTrigger: input.trim() });
      setinput('');
    } else if (input.trim().toLowerCase() === 'varsayılan') {
      storage.delete('bg-img-URL');
      router.setParams({ updateTrigger: input.trim() });
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
    } else if (input.trim().toLowerCase() === 'get timezone') {
      // GET TIMEZONE
      const tz = new Date().getTimezoneOffset() / -60;
      setinput(tz.toString());
    } else if (input.trim()[0] === '#') {
      // SET THEME-COLOR
      const hexColorPattern = /^#([A-Fa-f0-9]{6})$/;
      const isValidColor = hexColorPattern.test(input.trim());
      if (isValidColor) {
        storage.set('theme-color', input.trim());
        router.replace('/settings');
        setinput('');
      }
    }
    // else {
    //   useToast('Oyuncağa benziyor galiba.');
    //   setinput('');
    // }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, { borderColor: themeColor }]}
        onChangeText={setinput}
        onEndEditing={handleEndEditing}
        value={input}
        cursorColor={themeColor}
        autoCapitalize='none'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 50,
  },

  input: {
    textAlign: 'center',
    padding: 5,
    borderWidth: 2,
    borderRadius: 15,
    width: '70%',
    color: 'white',
    maxHeight: 44,
  },
});

export default memo(Konsol);
