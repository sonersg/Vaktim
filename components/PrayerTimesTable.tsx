import React, { memo, useContext, useEffect, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import minick from '../assets/minicik.json';
import { prayerTimeLabels } from '../assets/iller';
import { MMKVstorage } from '../app/(screens)/citiesList';
import { getHighlightedIndex, getRemaining } from '../utils/highlight';
import getTodaySarray from '../utils/todaySarray';

function PrayerTimesTable() {
  const [highlight, sethighlight] = useState(-1);
  const [remaining, setremaining] = useState('--');
  const [arry, setarry] = useState(getTodaySarray());
  const router = useRouter();
  // const data = useContext(ReRenderContext);

  // const shouldShowTimesOnPress =
  //   MMKVstorage.getString('show-times-when') === 'on-press';
  useEffect(() => {
    // if (shouldShowTimesOnPress) {
    //   sethighlight(-1);
    //   setremaining('--');
    // }
    // if (!shouldShowTimesOnPress) {
    //   showTimesAlways();
    // }

    const interval = setInterval(() => {
      // if (!shouldShowTimesOnPress) {
      setremaining(getRemaining() || '');
      // }

      // sethighlight
      sethighlight(getHighlightedIndex() || -1);
      // setarry
      setarry(getTodaySarray());
    }, 3000);
    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
    // }, [shouldShowTimesOnPress, data]);
  }, []);

  const storageColor = MMKVstorage.getString('theme-color') || 'skyblue';
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

  if (arry.length > 0) {
    return (
      <View style={styles.mainContainer}>
        <Pressable onPress={showTimesOnPress}>
          <Text style={styles.remainingStyle}>{remaining}</Text>
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
          <Text style={{ color: 'white', fontSize: 25 }}>
            {minick.Gaziantep.place.stateName}
          </Text>
        </TouchableHighlight>

        {/* <Text style={{ color: 'white', fontSize: 15 }}>{getSponsor()}</Text> */}
      </View>
    );
  } else {
    return (
      <View style={styles.mainContainer}>
        <Text style={{ color: 'white', fontSize: 20 }}>
          Lütfen bulunduğunuz şehri seçin.
        </Text>
        <TouchableHighlight
          style={[styles.btn, { backgroundColor: themeColor }]}
          onPress={() => router.push('citiesList')}
        >
          <Text style={{ color: 'white', fontSize: 25 }}>Şehirler</Text>
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
    borderRadius: 10,
    fontWeight: 'bold',
  },
});
