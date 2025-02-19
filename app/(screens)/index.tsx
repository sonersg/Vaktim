import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Menu from '../../components/Menu';
import Calendar from '../../components/Calendar';
import PrayerTimesTable from '../../components/PrayerTimesTable';
import { BackHandler, Platform } from 'react-native';

export default function Home() {
  const [menuVisible, setmenuVisible] = useState(false);

  console.log('index screen');

  const exitApp = () => {
    if (Platform.OS === 'android') {
      BackHandler.exitApp();
    }
  };

  return (
    <Pressable
      style={styles.mainContainer}
      onPress={() => setmenuVisible((prev) => !prev)}
      onLongPress={exitApp}
    >
      <View>
        <ScrollView>
          <Calendar />

          <PrayerTimesTable />
        </ScrollView>
      </View>
      <Menu menuVisible={menuVisible} />
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
