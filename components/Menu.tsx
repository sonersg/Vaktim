import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function Menu() {
  const router = useRouter();

  return (
    <View style={styles.menuContainer}>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => router.push('qada')}>
          <View style={styles.itemContainer}>
            <Text style={{ fontSize: 50 }}>📒</Text>
            <Text style={{ color: 'white' }}>Kaza Takibi</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('qibla')}>
          <View style={styles.itemContainer}>
            <Text style={{ fontSize: 50 }}>🧭</Text>
            <Text style={{ color: 'white' }}>Kıble</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('settings')}>
          <View style={styles.itemContainer}>
            <Text style={{ fontSize: 50 }}>💬</Text>
            <Text style={{ color: 'white' }}>Ayarlar</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* <View style={styles.row}>
        <View>
          <Text>item 4 </Text>
        </View>
        <View>
          <Text>item 5 </Text>
        </View>
        <View>
          <Text>item 6 </Text>
        </View>
      </View> */}
    </View>
  );
}

export default Menu;

const styles = StyleSheet.create({
  menuContainer: {
    display: 'flex',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 'auto',
    backgroundColor: '#242424',
    padding: 10,
  },

  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 5,
    marginVertical: 5,
  },

  btn: {
    backgroundColor: 'skyblue',
    padding: 10,
    margin: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },

  itemContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
