import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Menu from '../../components/Menu';
import Calendar from '../../components/Calendar';
import PrayerTimesTable from '../../components/PrayerTimesTable';

export default function Home() {
  const [menuVisible, setmenuVisible] = useState(false);

  console.log('index screen');

  return (
    <Pressable
      style={styles.mainContainer}
      onPress={() => setmenuVisible((prev) => !prev)}
    >
      <View>
        <ScrollView>
          <Calendar />

          <PrayerTimesTable />
        </ScrollView>
      </View>
      {menuVisible && <Menu />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    // for some reason "alignItems" cancelled "justifyContent"
  },

  text: {
    color: 'antiquewhite',
    fontWeight: 'bold',
    fontSize: 17,
  },

  btn: {
    backgroundColor: 'skyblue',
    padding: 10,
    margin: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },

  emoji: {
    fontSize: 50,
  },
});
