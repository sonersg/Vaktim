import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { storage } from './_layout';
import calculateArray from '../../utils/calculate';
import { getHijri, getISO, getTR } from '../../utils/date';

const SIZE = 33;
let countr = 0;

const ImsakiyeScreen = () => {
  const [arr, setarr] = useState<string[][]>([]);
  const [loading, setloading] = useState(true);

  const themeColor = storage.getString('theme-color') || 'skyblue';

  useEffect(() => {
    // Keep it as 3 for fast initial page rendering
    setarr(calculateArray(3));

    const timeout = setTimeout(() => {
      setarr(calculateArray(SIZE));
      setloading(false);
      countr = SIZE;
    }, 777);

    return () => clearTimeout(timeout);
  }, []);

  function fetchMore() {
    // console.log('end reached');
    if (loading) return;
    setloading(true);
    const temp = calculateArray(SIZE, countr);
    countr += SIZE;
    setarr((prev) => [...prev, ...temp]);
    setloading(false);
  }

  // Render a loading indicator at the bottom
  const renderFooter = () => {
    if (!loading) return null;
    return (
      <ActivityIndicator
        size='large'
        color={themeColor}
        style={{ marginVertical: 20 }}
      />
    );
  };

  if (arr.length > 0) {
    return (
      <View style={styles.container}>
        <Text style={[styles.header, { backgroundColor: themeColor }]}>
          {getTR()} - {getHijri()}
        </Text>

        <ScrollView horizontal>
          <FlatList
            data={arr}
            onEndReached={fetchMore}
            // onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
            renderItem={({ item, index }) => (
              <TouchableOpacity key={index} style={styles.displayRow}>
                <Text style={[styles.text, { color: themeColor }]}>
                  {getISO(index)}
                </Text>
                {item.map((time, index2) => (
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
                <Text style={[styles.text]}>{getHijri(index)}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
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
    padding: 5,
    backgroundColor: '#242424aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    margin: 5,
    // fontSize: 22,
  },

  displayRow: {
    display: 'flex',
    flexDirection: 'row',
    // gap: 5,
  },

  header: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginVertical: 20,
    // color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default ImsakiyeScreen;
