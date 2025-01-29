import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Menu from '../../components/Menu';
import Calendar from '../../components/Calendar';
import PrayerTimesTable from '../../components/PrayerTimesTable';

const defaultBgImgUri =
  'https://images.pexels.com/photos/8071161/pexels-photo-8071161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

export default function Home() {
  const [menuVisible, setmenuVisible] = useState(false);
  // const data = useContext(ReRenderContext);

  return (
    <ImageBackground
      // source={{
      //     uri: MMKVstorage.getString("bg-img-URL") || defaultBgImgUri,
      // }}
      source={{
        uri: defaultBgImgUri,
      }}
      style={{ flex: 1, backgroundColor: '#242424' }}
      resizeMode='cover'
    >
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

      <StatusBar
        style='dark'
        backgroundColor='transparent'
        translucent={true}
      />
    </ImageBackground>
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
