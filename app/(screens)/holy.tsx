import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { RDNObject } from '../../assets/iller';
import { storage } from './_layout';
import { IslamicEvents } from '../../assets/types/types';

const HolyDaysScreen = () => {
  const [religiousDaysNights, setreligiousDaysNights] =
    useState<IslamicEvents>(RDNObject);

  useEffect(() => {
    const jsonString = storage.getString('holy-days-nights');
    if (jsonString) {
      setreligiousDaysNights(JSON.parse(jsonString));
    }
  }, []);

  const themeColor = storage.getString('theme-color') || 'skyblue';

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{religiousDaysNights.dgg}</Text>
      <FlatList
        data={religiousDaysNights.value}
        renderItem={({ item, index }) => (
          <Text style={[styles.text, index % 2 !== 0 && { color: themeColor }]}>
            {item}
          </Text>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#242424aa',
    paddingHorizontal: 10,
  },

  header: {
    backgroundColor: 'green',
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginVertical: 50,
    color: 'white',
    fontWeight: 'bold',
  },

  text: {
    color: 'white',
    fontSize: 15,
    marginVertical: 5,
  },
});

export default HolyDaysScreen;
