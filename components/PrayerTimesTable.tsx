import React, { memo, useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { getHighlightedIndex, getRemaining } from '../utils/highlight';
import { storage } from '../app/(screens)/_layout';
import { getCurrentLocation } from '../utils/location';
import calculateArray from '../utils/calculate';
import Magnify from './Magnify';
import TableCells from './TableCells';

let city = storage.getString('selected-city') || 'Şehirler';
let themeColor = storage.getString('theme-color') || 'skyblue';

function PrayerTimesTable() {
  const [arry, setarry] = useState<string[]>([]);
  const [remaining, setremaining] = useState('--');
  const [highlight, sethighlight] = useState(-1);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      // console.log(storage.getString('auto-location'));

      themeColor = storage.getString('theme-color') || 'skyblue';
      city = storage.getString('selected-city') || '-';

      let arr = calculateArray(1)[0];
      setarry(arr);
      setremaining(getRemaining(arr) || '--');
      sethighlight(getHighlightedIndex(arr) || 0);

      const timeout = setTimeout(() => {
        const autoLocation = storage.getString('auto-location') || 'on';
        autoLocation === 'on' &&
          (async () => {
            const loc = await getCurrentLocation();
            console.log(loc);
            if (loc === 'location-changed') {
              city = storage.getString('selected-city') || '-';
              arr = calculateArray(1)[0];
              setarry(arr);
              setremaining(getRemaining(arr) || '--');
              sethighlight(getHighlightedIndex(arr) || 0);
            }
          })();
      }, 1111);

      const interval = setInterval(() => {
        if (new Date().getHours() === 0) {
          if (new Date().getMinutes() === 0) {
            arr = calculateArray(1)[0];
            setarry(arr);
          }
        }

        setremaining(getRemaining(arr) || '--');
        sethighlight(getHighlightedIndex(arr) || 0);
      }, 3333);

      return () => {
        console.log('Screen unfocused, clearing interval');
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }, [])
  );

  return (
    <View style={styles.mainContainer}>
      <Magnify remaining={remaining} themeColor={themeColor} />

      <TableCells
        arry={arry}
        setarry={setarry}
        highlight={highlight}
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
    paddingVertical: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'static',
  },

  text: {
    color: 'white',
    fontSize: 25,
  },

  btn: {
    paddingBottom: 5,
    margin: 30,
    paddingHorizontal: 20,
    borderRadius: 10,
    maxWidth: '99%',
  },
});
