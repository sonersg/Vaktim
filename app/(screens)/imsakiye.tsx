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
import calculateArray from '../../utils/calculate';
import { getHijri, getISO, getMonth } from '../../utils/date';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { themeColor } from '../../components/PrayerTimesTable';

let countr = 0;
const SIZE = 33;

const ImsakiyeScreen = () => {
  const [arr, setarr] = useState<string[][]>([]);
  const [loading, setloading] = useState(true);
  const fontsz = useSharedValue(15);

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

  function zoomInOut() {
    if (fontsz.value < 27) fontsz.value += 5;
    else fontsz.value = withTiming(15);
  }

  const animatedStyle = useAnimatedStyle(() => {
    return {
      fontSize: fontsz.value,
      margin: 5,
    };
  });

  // Render a loading indicator at the bottom
  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator color={themeColor} />;
  };

  if (arr.length > 2) {
    return (
      <View style={styles.container}>
        <Text style={[styles.header, { backgroundColor: themeColor }]}>
          {getMonth()} - {getHijri()}
        </Text>

        <ScrollView horizontal>
          <FlatList
            data={arr}
            onEndReached={fetchMore}
            // onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                key={index}
                onPress={zoomInOut}
                style={styles.displayRow}
              >
                <Animated.Text style={[animatedStyle, { color: themeColor }]}>
                  {getISO(index)}
                </Animated.Text>
                {item.map((time, index2) => (
                  <Animated.Text
                    key={index2}
                    style={[
                      animatedStyle,
                      { color: index2 % 2 != 0 ? themeColor : 'white' },
                    ]}
                  >
                    {time}
                  </Animated.Text>
                ))}
                <Animated.Text style={[animatedStyle, { color: 'white' }]}>
                  {getHijri(index)}
                </Animated.Text>
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
        <Text style={{ color: '#fff' }}>Konum seçiniz</Text>
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

  displayRow: {
    display: 'flex',
    flexDirection: 'row',
    // gap: 5,
  },

  header: {
    paddingHorizontal: 11,
    paddingVertical: 5,
    marginVertical: 15,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
  },
});

export default ImsakiyeScreen;
