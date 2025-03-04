import React, { memo, useCallback, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { prayerTimeLabels } from '../assets/iller';
import {
  getHighlightedIndex,
  getRemaining,
  getTouched,
} from '../utils/highlight';
import { storage } from '../app/(screens)/_layout';
import { getCurrentLocation } from '../utils/location';
import calculateArray from '../utils/calculate';
import Magnify from './Magnify';
import { cancellAlarm, setAlarm, testAlarm } from '../utils/expoAlarm';
// import Modal from './Modal';

let city = storage.getString('selected-city') || 'Şehirler';
let themeColor = storage.getString('theme-color') || 'skyblue';

function PrayerTimesTable() {
  const [arry, setarry] = useState<string[]>([]);
  const [remaining, setremaining] = useState('--');
  const [bell, setbell] = useState('');
  const [highlight, sethighlight] = useState(-1);
  const router = useRouter();
  // const [modalVisible, setmodalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      // console.log(storage.getString('auto-location'));

      themeColor = storage.getString('theme-color') || 'skyblue';
      city = storage.getString('selected-city') || '-';

      setbell(storage.getString('bells') || '111000');

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

  function handleBell(index: number) {
    if (bell[index] === '0') {
      const temp = bell.substring(0, index) + '1' + bell.substring(index + 1);
      storage.set('bells', temp);
      setbell(temp);
      setAlarm(index);
    } else if (bell[index] === '1') {
      const temp = bell.substring(0, index) + '0' + bell.substring(index + 1);
      storage.set('bells', temp);
      setbell(temp);
      cancellAlarm(index);
    }
  }

  if (arry.length === 6) {
    return (
      <View style={styles.mainContainer}>
        <Magnify remaining={remaining} themeColor={themeColor} />

        <View>
          {arry.map((time: string, index: number) => (
            <TouchableOpacity
              key={index}
              style={[styles.eachTimeContainer]}
              onPress={() => setremaining(getTouched(time))}
              // onLongPress={() => setmodalVisible(true)}
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

              <View style={styles.row}>
                <TouchableOpacity
                  style={styles.bell}
                  onPress={() => handleBell(index)}
                >
                  <Text>{bell[index] === '1' ? '🔔' : '⚫️'}</Text>
                </TouchableOpacity>

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
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableHighlight
          style={[styles.btn, { backgroundColor: themeColor }]}
          onPress={() => router.navigate('citiesList')}
          // onPress={testAlarm}
        >
          <Text style={styles.text}>{city}</Text>
        </TouchableHighlight>

        {/* <Text style={{ color: 'white', fontSize: 15 }}>{getSponsor()}</Text> */}

        {/* <Modal modalVisible={modalVisible} setmodalVisible={setmodalVisible} /> */}
      </View>
    );
  } else {
    return (
      <View style={styles.mainContainer}>
        <TouchableHighlight
          style={[styles.btn, { backgroundColor: themeColor }]}
          onPress={() => router.push('citiesList')}
        >
          <Text style={styles.text}>Şehirler</Text>
        </TouchableHighlight>
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
    position: 'static',
  },

  eachTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#33333399',
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderWidth: 3,
    borderColor: '#777',
    borderRadius: 15,
    width: 240,
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

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '57%',
  },

  bell: {
    // backgroundColor: 'red',
    padding: 7,
  },
});
