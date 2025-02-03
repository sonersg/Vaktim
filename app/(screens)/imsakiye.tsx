import React from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { storage } from './_layout';
import getToday from '../../utils/todayTR';
import getHijri from '../../utils/getHijri';
import prayerTimes from '../../assets/minicik.json';
import { IPrayerTimesObject } from '../../assets/types/sampleObjectType';

{
  /* <FlatList
        data={religiousDaysNights.value}
        renderItem={({ item, index }) => (
          <Text style={[styles.text, index % 2 !== 0 && { color: themeColor }]}>
            {item}
          </Text>
        )}
        // keyExtractor={(item, index) => index.toString()}
/> */
}

const ImsakiyeScreen = () => {
  //   console.log('imsakiye screen');

  const currentCity = storage.getString('selected-city') || '';
  const themeColor = storage.getString('theme-color') || 'skyblue';
  const today = new Date().toISOString().slice(0, 10);
  const keys = Object.keys(prayerTimes);
  let timesObject: IPrayerTimesObject | null;
  if (keys.includes(currentCity)) {
    //@ts-ignore
    timesObject = prayerTimes[currentCity];
  } else {
    timesObject = null;
  }

  if (timesObject?.times[today]) {
    const keysArray = Object.keys(timesObject.times);
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {getToday()} - {getHijri()}
          </Text>
        </View>
        <ScrollView>
          {keysArray.map((date, index) => (
            <View
              key={index}
              style={[
                styles.displayRow,
                date === today && styles.highlightToday,
              ]}
            >
              <Text style={[styles.text, { color: themeColor }]}>{date}</Text>
              {timesObject.times[date].map((time, index2) => (
                <Text
                  key={index2}
                  style={[
                    styles.text,
                    index2 % 2 !== 0 && { color: themeColor },
                  ]}
                >
                  {time}
                </Text>
              ))}
            </View>
          ))}
          <Text></Text>
        </ScrollView>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Vakitleri güncelleyiniz.</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: '#242424aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    margin: 5,
  },

  displayRow: {
    display: 'flex',
    flexDirection: 'row',
    // gap: 5,
  },

  highlightToday: {
    backgroundColor: 'green',
  },

  header: {
    backgroundColor: 'green',
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginVertical: 20,
  },

  headerText: {
    fontWeight: 'bold',
    color: 'white',
  },
});

export default ImsakiyeScreen;
