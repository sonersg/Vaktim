import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Qibla() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#242424a4',
        paddingHorizontal: 10,
        // Paddings to handle safe area
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <Text style={styles.text}>Gördüğün ilk kişiye kıbleyi sor.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: 'red',
    paddingBottom: 5,
    margin: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },

  text: {
    color: 'white',
    fontSize: 18,
  },
});
