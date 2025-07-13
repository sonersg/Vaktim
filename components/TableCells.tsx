import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Button,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import React, { memo, useEffect, useState } from 'react';
import { storage } from '../app/(screens)/_layout';
import { cancellAlarm, setAlarm } from '../utils/expoAlarm';
import { getTouched } from '../utils/highlight';
import calculateArray from '../utils/calculate';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import translation from '../assets/translations/translations';

interface ITableCellsProps {
  arry: string[];
  themeColor: string;
  highlight: number;
  setarry: React.Dispatch<React.SetStateAction<string[]>>;
  setremaining: React.Dispatch<React.SetStateAction<string>>;
}
function TableCells({
  arry,
  setarry,
  highlight,
  themeColor,
  setremaining,
}: ITableCellsProps) {
  const [tunesObject, settunesObject] = useState(defaultTunesObject);
  const [modalVisible, setmodalVisible] = useState(false);
  const [bell, setbell] = useState('000000');
  const opacity = useSharedValue(0);
  const t = translation();

  // console.log('table cells');

  useEffect(() => {
    setbell(storage.getString('bells') || '111000');

    const to = storage.getString('tunes-object');
    if (to) settunesObject(JSON.parse(to));
  }, []);

  useEffect(() => {
    if (!modalVisible) opacity.value = 0;
  }, [modalVisible]);

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

  function handleLongPress(index: number) {
    setmodalVisible(true);
    opacity.value = withTiming(1, { duration: 999 });
    settunesObject({
      ...tunesObject,
      id: index,
    });
  }

  function handleOffsets(min: string) {
    const currentLabel = translation('en').home.labels[tunesObject.id];
    const updatedTunesObject = {
      ...tunesObject,
      [currentLabel.toLowerCase()]: min,
    };
    settunesObject(updatedTunesObject);
    storage.set('tunes-object', JSON.stringify(updatedTunesObject));
    setarry(calculateArray(1)[0]);
  }

  function handleResetOffsets() {
    settunesObject({
      ...tunesObject,
      fajr: '0',
      sunrise: '0',
      dhuhr: '0',
      asr: '0',
      maghrib: '0',
      isha: '0',
    });
    storage.delete('tunes-object');
    setarry(calculateArray(1)[0]);
  }

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <>
      <View>
        {arry.map((time: string, index: number) => (
          <TouchableOpacity
            key={index}
            style={[styles.eachTimeContainer, { width: t.home.width }]}
            onPress={() => setremaining(getTouched(time))}
            onLongPress={() => handleLongPress(index)}
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
              {t.home.labels[index]}
            </Text>

            <View style={styles.row}>
              <TouchableHighlight
                style={styles.bell}
                onPress={() => handleBell(index)}
              >
                <Text>{bell[index] === '1' ? '🔔' : '⚫️'}</Text>
              </TouchableHighlight>

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

      {/* ************* Modal ******************* */}
      <View
        style={[
          styles.centeredView,
          { display: modalVisible ? 'flex' : 'none' },
        ]}
      >
        <Animated.View style={[styles.modalView, animatedStyle]}>
          {modalVisible && (
            <Text style={styles.title}>
              {t.home.labels[tunesObject.id]}:{' '}
              {
                // @ts-ignore
                tunesObject[
                  translation('en').home.labels[tunesObject.id].toLowerCase()
                ]
              }{' '}
              {t.home.min}
            </Text>
          )}

          <View style={styles.scrollViewContainer}>
            <ScrollView>
              {minutesArray.map((min) => (
                <TouchableOpacity key={min} onPress={() => handleOffsets(min)}>
                  <Text style={styles.scrollText}>{min}'</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={{ flexDirection: 'row', gap: 22 }}>
            <Button
              title={t.home.btnReset}
              onPress={handleResetOffsets}
              color='transparent'
            />
            <Button
              title={t.home.btnOk}
              onPress={() => setmodalVisible(false)}
              color='transparent'
            />
          </View>
        </Animated.View>
      </View>
    </>
  );
}

export default memo(TableCells);

const styles = StyleSheet.create({
  eachTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#33333399',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderWidth: 3,
    borderColor: '#777',
    borderRadius: 15,
    width: 255,
  },

  text: {
    color: 'white',
    fontSize: 24,
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

  // ************ Modal styles ******************
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 11,
    // backgroundColor: 'aqua',
  },

  modalView: {
    backgroundColor: '#797979aa',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
  },

  scrollViewContainer: {
    // backgroundColor: '#333',
    height: 222,
    minWidth: 111,
    marginVertical: 11,
  },

  scrollText: {
    borderBottomWidth: 2,
    borderColor: 'white',
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
    padding: 5,
    marginVertical: 5,
  },

  title: {
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold',
  },
});

const defaultTunesObject = {
  id: 1,
  fajr: '0',
  sunrise: '0',
  dhuhr: '0', // Add 5 minutes to dhuhr
  asr: '0',
  maghrib: '0',
  isha: '0',
};

export const minutesArray = [
  '-44',
  '-43',
  '-42',
  '-41',
  '-40',
  '-39',
  '-38',
  '-37',
  '-36',
  '-35',
  '-34',
  '-33',
  '-32',
  '-31',
  '-30',
  '-29',
  '-28',
  '-27',
  '-26',
  '-25',
  '-24',
  '-23',
  '-22',
  '-21',
  '-20',
  '-19',
  '-18',
  '-17',
  '-16',
  '-15',
  '-14',
  '-13',
  '-12',
  '-11',
  '-10',
  '-9',
  '-8',
  '-7',
  '-6',
  '-5',
  '-4',
  '-3',
  '-2',
  '-1',
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
  '31',
  '32',
  '33',
  '34',
  '35',
  '36',
  '37',
  '38',
  '39',
  '40',
  '41',
  '42',
  '43',
  '44',
];
