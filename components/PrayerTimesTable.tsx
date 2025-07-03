import React, { memo, useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { getHighlightedIndex, getRemaining } from '../utils/highlight';
import { storage } from '../app/(screens)/_layout';
import { getCurrentLocation } from '../utils/location';
import calculateArray from '../utils/calculate';
import Magnify from './Magnify';
import TableCells from './TableCells';
import { resetAlarms } from '../utils/expoAlarm';
import useToast from '../utils/useToast';

let city = storage.getString('selected-city') || 'Şehirler';
let themeColor = storage.getString('theme-color') || 'skyblue';
const defaultArry = ['0:0', '0:0', '0:0', '0:0', '0:0', '0:0'];

function PrayerTimesTable() {
  const [arry, setarry] = useState(defaultArry);
  const [remaining, setremaining] = useState('-');
  const [highlight, sethighlight] = useState(-1);
  const router = useRouter();

  console.log('prayer times table');

  useFocusEffect(
    useCallback(() => {
      // console.log(storage.getString('auto-location'));

      setarry(calculateArray(1)[0]);

      const timeout = setTimeout(() => {
        city = storage.getString('selected-city') || '--';
        themeColor = storage.getString('theme-color') || 'skyblue';
        const autoLocation = storage.getString('auto-location') || 'on';
        autoLocation === 'on' &&
          getCurrentLocation().then((res) => {
            useToast(res);
            if (res === 'location-changed') {
              city = storage.getString('selected-city') || '-';
              setarry(calculateArray(1)[0]);
            }
          });
      }, 1111);

      return () => clearTimeout(timeout);
    }, [])
  );

  useEffect(() => {
    resetAlarms();
    setremaining(getRemaining(arry));
    sethighlight(getHighlightedIndex(arry));

    const interval = setInterval(() => {
      setremaining(getRemaining(arry));
      sethighlight(getHighlightedIndex(arry));
    }, 3333);

    return () => {
      console.log('does interval unmount on array change');
      clearInterval(interval);
    };
  }, [arry]);

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
