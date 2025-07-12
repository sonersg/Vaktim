import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { memo, useContext, useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { getHHmmss, getHijri, getMonth } from '../utils/date';
import { ReRenderContext } from '../context/ReRenderContext';

function Calendar() {
  const [currentTime, setCurrentTime] = useState(getHHmmss());
  const data = useContext(ReRenderContext);
  const router = useRouter();

  const tr = getMonth();
  const hijri = getHijri();

  // console.log('calendar is called');

  useEffect(() => {
    setCurrentTime(getHHmmss());
    // update current time
    const interval = setInterval(() => {
      setCurrentTime(getHHmmss());
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

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
  return 14;
}
