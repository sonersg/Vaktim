import { StyleSheet, Text, View, Pressable } from 'react-native';
import moment from 'moment';
import { memo, useEffect, useState } from 'react';
import getToday from '../utils/todayTR';
import getHijri from '../utils/getHijri';

function Calendar() {
  const [currentTime, setCurrentTime] = useState(moment().format('HH:mm'));

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
      <Pressable
        style={styles.one}
        // onPress={() => navigation.navigate("Dini Gün ve Geceler")}
      >
        <Text style={[styles.text, { fontSize: 40 }]}>{currentTime}</Text>
      </Pressable>

      <Pressable
        style={styles.one}
        // onPress={() => navigation.navigate("İmsakiye")}
      >
        <Text style={[styles.text]}>{getToday()}</Text>
        <Text style={[styles.text]}>{getHijri()}</Text>
      </Pressable>
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
    fontSize: 17,
  },
});
