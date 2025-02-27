import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const itemHeight = 55; // Adjust based on your scrollItem style
const containerHeight = 144; //  ScrollView container height
const offset = (containerHeight - itemHeight) / 2; // important for centering the start value.

const MyCustomSpinner = () => {
  const [selectedValue, setSelectedValue] = useState(0);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const initialIndex = nmbrs.indexOf(selectedValue);

    if (scrollViewRef.current) {
      // Use the *index* to calculate the initial scroll position
      (scrollViewRef.current as ScrollView).scrollTo({
        y: initialIndex * itemHeight - offset,
        animated: false,
      });
    }
  }, []);

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const focusedIndex = Math.round((offsetY + offset) / itemHeight); // Calculate focused index.  + offset!
    setSelectedValue(nmbrs[focusedIndex] || 0); // Update selectedValue.  Handle out-of-bounds.
  };

  const handleMomentumScrollEnd = (event: any) => {
    //this is to center items after stop scroll
    const offsetY = event.nativeEvent.contentOffset.y;
    const focusedIndex = Math.round((offsetY + offset) / itemHeight);
    if (scrollViewRef.current) {
      (scrollViewRef.current as ScrollView).scrollTo({
        y: focusedIndex * itemHeight - offset,
        animated: true,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.scrollText}>{selectedValue}</Text>
      <View style={styles.scrollViewContainer}>
        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll} // Call handleScroll on every scroll event
          onMomentumScrollEnd={handleMomentumScrollEnd} // Call after momentum scrolling ends
          scrollEventThrottle={16} // Control how often onScroll is called (16ms is good for smooth updates)
        >
          {nmbrs.map((nmbr, indx) => (
            <View
              key={indx}
              style={[
                styles.scrollItem,
                nmbr === selectedValue && styles.selectedItem,
              ]}
            >
              <Text style={styles.scrollText}>{nmbr}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    width: '55%',
  },
  scrollViewContainer: {
    height: containerHeight,
    width: 188,
    overflow: 'hidden',
    borderStartWidth: 2,
    borderEndWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
  },
  scrollItem: {
    height: itemHeight,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: 111,
  },
  selectedItem: {
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderColor: '#fff',
    // transform: [{ scale: 1.2 }],
  },
  scrollText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default MyCustomSpinner;

const nmbrs = [
  -22, -21, -20, -19, -18, -17, -16, -15, -14, -13, -12, -11, -10, -9, -8, -7,
  -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  16, 17, 18, 19, 20, 21, 22,
];
