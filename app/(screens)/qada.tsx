import React, { useState } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { storage } from './_layout';
import { getHHmmss, getMonth } from '../../utils/date';
import { themeColor } from '../../components/PrayerTimesTable';
import translation from '../../assets/translations/translations';

export default function Qada() {
  const [fajr, setfajr] = useState(storage.getNumber('qada-fajr') || 0);
  const [dhuhr, setdhuhr] = useState(storage.getNumber('qada-dhuhr') || 0);
  const [asr, setasr] = useState(storage.getNumber('qada-asr') || 0);
  const [maghrib, setmaghrib] = useState(
    storage.getNumber('qada-maghrib') || 0
  );
  const [isha, setisha] = useState(storage.getNumber('qada-isha') || 0);
  const [vitr, setvitr] = useState(storage.getNumber('qada-vitr') || 0);
  const [sawm, setsawm] = useState(storage.getNumber('qada-sawm') || 0);
  const [edited, setedited] = useState(storage.getString('last-edit') || '');

  const t = translation();

  const states = [
    {
      name: 'fajr',
      state: fajr,
      setstate: setfajr,
    },
    {
      name: 'dhuhr',
      state: dhuhr,
      setstate: setdhuhr,
    },
    {
      name: 'asr',
      state: asr,
      setstate: setasr,
    },
    {
      name: 'maghrib',
      state: maghrib,
      setstate: setmaghrib,
    },
    {
      name: 'isha',
      state: isha,
      setstate: setisha,
    },
    {
      name: 'vitr',
      state: vitr,
      setstate: setvitr,
    },
    {
      name: 'sawm',
      state: sawm,
      setstate: setsawm,
    },
  ];

  function updateQada(
    setQada: React.Dispatch<React.SetStateAction<number>>,
    plusOrMines: string,
    qada: string
  ) {
    // last edited
    const lastEdit = getMonth() + ' ~ ' + getHHmmss(true);
    storage.set('last-edit', lastEdit);
    setedited(lastEdit);

    // increase, decrease
    if (plusOrMines === '+') {
      setQada((prv) => {
        if (prv + 1 > 500) return 500;
        storage.set('qada-' + qada, prv + 1);
        return prv + 1;
      });
    } else if (plusOrMines === '-') {
      setQada((prv) => {
        if (prv - 1 < 0) return 0;
        storage.set('qada-' + qada, prv - 1);
        return prv - 1;
      });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.edit}>{edited}</Text>
      {t.qada.labels.map((label, index) => (
        <View
          key={index}
          style={[styles.sectionContainer, { backgroundColor: themeColor }]}
        >
          <Text style={styles.text}>{label}:</Text>
          <View style={styles.dRow}>
            <TouchableHighlight
              style={styles.touchableHghlght}
              onPress={() =>
                updateQada(states[index].setstate, '-', states[index].name)
              }
            >
              <Text style={styles.text}>-</Text>
            </TouchableHighlight>

            <Text style={styles.text}>{states[index].state}</Text>

            <TouchableHighlight
              style={styles.touchableHghlght}
              onPress={() =>
                updateQada(states[index].setstate, '+', states[index].name)
              }
            >
              <Text style={styles.text}>+</Text>
            </TouchableHighlight>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
    gap: 20,
  },

  sectionContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#444',
    justifyContent: 'space-between',
    padding: 10,
  },

  dRow: {
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-between',
  },

  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },

  edit: {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#444',
    borderRadius: 15,
    padding: 5,
  },

  touchableHghlght: {
    backgroundColor: '#444',
    paddingBottom: 5,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
});
