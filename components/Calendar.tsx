import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { memo, useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import moment from 'moment-timezone';
import { getHijri, getTR } from '../utils/date';

const tr = getTR();
const hijri = getHijri();

function Calendar() {
  const [currentTime, setCurrentTime] = useState(moment().format('HH:mm'));
  const router = useRouter();

  useEffect(() => {
    // update current time
    const interval = setInterval(() => {
      setCurrentTime(moment().format('HH:mm'));
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  // console.log('calendar is called');

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.one}
        onPress={() => router.navigate('holy')}
      >
        <Text style={[styles.text, { fontSize: 40 }]}>{currentTime}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.one}
        onPress={() => router.navigate('imsakiye')}
      >
        <Text style={[styles.text, { fontSize: getFontSize(tr) }]}>{tr}</Text>
        <Text style={[styles.text, { fontSize: getFontSize(hijri) }]}>
          {hijri}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default memo(Calendar);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },

  one: {
    backgroundColor: '#33333399',
    borderWidth: 3,
    borderColor: '#777',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
    marginHorizontal: 3,
    width: 150,
    height: 80,
  },

  text: {
    color: 'antiquewhite',
    fontWeight: 'bold',
  },
});

function getFontSize(text: string) {
  if (text.length < 15) return 17;
  return 15;
}
