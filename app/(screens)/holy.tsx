import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { storage } from './_layout';
import { IslamicEvents } from '../../assets/types/types';
import t from '../../assets/translations/translations';

const HolyDaysScreen = () => {
  const [religiousDaysNights, setreligiousDaysNights] = useState<IslamicEvents>(
    t().holy.holyData
  );

  useEffect(() => {
    console.log(t().qada.labels);
    const jsonString = storage.getString('holy-days-nights');
    if (jsonString) {
      setreligiousDaysNights(JSON.parse(jsonString));
    }
  }, []);

  const themeColor = storage.getString('theme-color') || 'hotpink';

  return (
    <View style={styles.container}>
      <Text style={[styles.header, { backgroundColor: themeColor }]}>
        {religiousDaysNights.dgg}
      </Text>

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
    padding: 10,
  },

  header: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginVertical: 30,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },

  text: {
    color: 'white',
    fontSize: 17,
    marginVertical: 5,
  },
});

export default HolyDaysScreen;
