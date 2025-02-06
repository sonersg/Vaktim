import React, { memo, useCallback, useRef, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { prayerTimeLabels } from '../assets/iller';
import { getHighlightedIndex, getRemaining } from '../utils/highlight';
import { storage } from '../app/(screens)/_layout';
import { getCurrentLocation } from '../utils/location';
import calculateArray from '../utils/calculate';

function PrayerTimesTable() {
  const [arry, setarry] = useState<string[]>([]);
  const [remaining, setremaining] = useState('r');
  const [highlight, sethighlight] = useState(-1);
  const autoLocation = useRef(storage.getBoolean('auto-location') || true);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      // console.log(autoLocation.current);

      autoLocation.current &&
        (async () => {
          await getCurrentLocation();
        })();

      let arr = calculateArray(1)[0];
      setarry(arr);
      setremaining(getRemaining(arr) || '--');
      sethighlight(getHighlightedIndex(arr) || 0);
      const interval = setInterval(() => {
        if (new Date().getHours() === 23) {
          arr = calculateArray(1)[0];
        }

        // if (!shouldShowTimesOnPress) {
        setremaining(getRemaining(arr) || '--');
        // }

        // sethighlight
        sethighlight(getHighlightedIndex(arr) || 0);
        // setarry
        setarry(arr);
      }, 3000);

      return () => {
        console.log('Screen unfocused, clearing interval');
        clearInterval(interval);
      };
    }, [])
  );

  const city = storage.getString('selected-city') || 'skyblue';
  const storageColor = storage.getString('theme-color') || 'skyblue';
  const themeColor = storageColor === 'skyblue' ? '#87ceeb' : '#ff69b4';

  // showTimesOnPress function
  function showTimesOnPress() {
    // sethighlight(getTimes(getParsedPrayerTimes()).time);
    // let rt, rta;
    // if (getTimes(getParsedPrayerTimes()).time === -1) {
    //   rt = getTimes(getParsedPrayerTimes()).timeLeft;
    // } else {
    //   rta = getTimes(getParsedPrayerTimes()).timeLeft.split(':');
    //   rt = rta[0] === '0' ? rta[1] : rta[0] + ':' + rta[1];
    // }
    // setremaining(rt);
    // setTimeout(() => {
    //   sethighlight(-1);
    //   setremaining('--');
    // }, 3000);
  }

  if (arry.length === 6) {
    return (
      <View style={styles.mainContainer}>
        <Pressable onPress={showTimesOnPress}>
          <Text style={[styles.remainingStyle, { color: themeColor }]}>
            {remaining}
          </Text>
        </Pressable>

        <View>
          {arry.map((time: string, index: number) => (
            <TouchableOpacity
              key={index}
              style={[styles.eachTimeContainer]}
              // onPress={index === 4 ? getSunset : undefined}
            >
              <Text
                style={[
                  styles.text,
                  highlight === index && {
                    fontWeight: 'bold',
                    color: themeColor,
                  },
                ]}
              >
                {prayerTimeLabels[index]}:
              </Text>
              <Text
                style={[
                  styles.text,
                  highlight === index && {
                    fontWeight: 'bold',
                    color: themeColor,
                  },
                ]}
              >
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableHighlight
          style={[styles.btn, { backgroundColor: themeColor }]}
          onPress={() => router.navigate('citiesList')}
        >
          <Text style={{ color: 'white', fontSize: 25 }}>{city}</Text>
        </TouchableHighlight>

        {/* <Text style={{ color: 'white', fontSize: 15 }}>{getSponsor()}</Text> */}
      </View>
    );
  } else {
    return (
      <View style={styles.mainContainer}>
        <TouchableHighlight
          style={[styles.btn, { backgroundColor: themeColor }]}
          onPress={() => router.push('citiesList')}
        >
          <Text style={{ color: 'white', fontSize: 25 }}>Şehirler</Text>
        </TouchableHighlight>
        <Text style={{ color: 'white', fontSize: 20 }}>
          Lütfen bulunduğunuz şehri seçin.
        </Text>
      </View>
    );
  }
}

export default memo(PrayerTimesTable);

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  eachTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#33333399',
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderWidth: 3,
    borderColor: '#777',
    borderRadius: 15,
    width: 210,
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
  },

  remainingStyle: {
    fontSize: 20,
    color: 'white',
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#33333399',
    fontWeight: 'bold',
    borderWidth: 3,
    borderColor: '#777',
    borderRadius: 15,
  },
});
