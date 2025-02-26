import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { storage } from '../app/(screens)/_layout';
import { cancellAlarm, setAlarm } from '../utils/expoAlarm';
import { getTouched } from '../utils/highlight';
import { prayerTimeLabels } from '../assets/iller';

interface ITableCellsProps {
  arry: string[];
  highlight: number;
  themeColor: string;
  setremaining: React.Dispatch<React.SetStateAction<string>>;
  setmodalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function TableCells({
  arry,
  highlight,
  themeColor,
  setremaining,
  setmodalVisible,
}: ITableCellsProps) {
  const [bell, setbell] = useState(storage.getString('bells') || '111000');

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
  return (
    <View>
      {arry.map((time: string, index: number) => (
        <TouchableOpacity
          key={index}
          style={[styles.eachTimeContainer]}
          onPress={() => setremaining(getTouched(time))}
          //   onLongPress={() => setmodalVisible(true)}
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
  );
}

const styles = StyleSheet.create({
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
