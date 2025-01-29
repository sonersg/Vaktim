import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { MMKVstorage } from './CitiesListScreen';
import { IslamicEvents } from '../types/religiousDaysObjectType';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RDNObject } from '../../assets/iller';

const ReligiousDaysScreen = () => {
  const [religiousDaysNights, setreligiousDaysNights] =
    useState<IslamicEvents>(RDNObject);

  const insets = useSafeAreaInsets();

  useEffect(() => {
    const jsonString = MMKVstorage.getString('religious-days-nights');
    if (jsonString) {
      setreligiousDaysNights(JSON.parse(jsonString));
    }
  }, []);

  const themeColor = MMKVstorage.getString('theme-color') || 'skyblue';

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#242424',
        paddingHorizontal: 10,
        // Paddings to handle safe area
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
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
  header: {
    backgroundColor: 'green',
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginVertical: 20,
    color: 'white',
    fontWeight: 'bold',
  },

  text: {
    color: 'white',
    fontSize: 15,
    marginVertical: 5,
  },
});

export default ReligiousDaysScreen;
