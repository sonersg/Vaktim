import React, { memo, useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { arrSize2, getRemaining } from '../utils/highlight';
import { storage } from '../app/(screens)/_layout';
import { getCurrentLocation } from '../utils/location';
import calculateArray from '../utils/calculate';
import Magnify from './Magnify';
import TableCells from './TableCells';
import { resetAlarms } from '../utils/expoAlarm';
import useToast from '../utils/useToast';

let city = 'Şehirler';
export let themeColor: string;
let getDate = new Date().getDate();

function PrayerTimesTable() {
  const [arry, setarry] = useState(arrSize2[0]);
  const [remaining, setremaining] = useState('');
  const router = useRouter();

  // console.log('prayer times table');

  useFocusEffect(
    useCallback(() => {
      city = storage.getString('selected-city') || 'Şehirler';
      themeColor = storage.getString('theme-color') || 'hotpink';

      setarry(calculateArray(1)[0]);

      // const timeout = setTimeout(() => {
      const autoLocation = storage.getString('auto-location') || 'on';
      autoLocation == 'on' &&
        getCurrentLocation().then((res) => {
          useToast(res);
          if (res == 'location-changed') {
            city = storage.getString('selected-city') || '-';
            setarry(calculateArray(1)[0]);
          }
        });
      // }, 222);

      // return () => clearTimeout(timeout);
    }, [])
  );

  useEffect(() => {
    setremaining(getRemaining(arry));

    const interval = setInterval(() => {
      setremaining(getRemaining(arry));

      if (getDate != new Date().getDate()) {
        getDate = new Date().getDate();
        router.replace('/');
      }

      // if (new Date().getHours() == 0)
      //   if (new Date().getMinutes() == 0)
      //     if (new Date().getSeconds() < 4) {
      //       router.replace('/');
      //     }
    }, 3333);

    return () => {
      resetAlarms();
      clearInterval(interval);
      console.log('does interval unmount on array change');
    };
  }, [arry]);

  // if (arry.length < 6) return <ActivityIndicator size='large' />;

  return (
    <View style={styles.mainContainer}>
      <Magnify remaining={remaining} themeColor={themeColor} />

      <TableCells
        arry={arry}
        setarry={setarry}
        themeColor={themeColor}
        setremaining={setremaining}
      />

      <TouchableHighlight
        style={[styles.btn, { backgroundColor: themeColor }]}
        onPress={() => router.navigate('citiesList')}
        // onPress={testAlarm}
      >
        <Text style={styles.text}>{city}</Text>
      </TouchableHighlight>

      {/* <Text style={{ color: 'white', fontSize: 15 }}>{getSponsor()}</Text> */}
    </View>
  );
}

export default memo(PrayerTimesTable);

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 22,
  },

  text: {
    color: 'white',
    fontSize: 25,
  },

  btn: {
    paddingBottom: 5,
    paddingHorizontal: 20,
    marginVertical: 33,
    borderRadius: 10,
  },
});
