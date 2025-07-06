import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { iller } from '../../assets/iller';
import { getFavs, setFavs } from '../../utils/favsArray';
import { storage } from './_layout';

export default function CitiesList() {
  const router = useRouter();
  const [concatedArr, setconcatedArr] = useState(getFavs());

  useEffect(() => {
    const favsArr = getFavs();
    const concated = favsArr.concat(iller);
    setconcatedArr(concated);
  }, []);

  async function handleItemPress(cityName: string, lat: number, lon: number) {
    if (cityName === '--') return;
    setFavs(cityName, lat, lon);
    storage.set('lat', lat);
    storage.set('lon', lon);
    router.back();
  }

  return (
    <FlatList
      data={concatedArr}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() =>
            handleItemPress(item.name, item.latitude, item.longitude)
          }
        >
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.ad}>{item.name}</Text>
            <Text style={styles.plaka}>{item.code}</Text>
          </View>
          <Text style={styles.sponsor}>{item.sponsor}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

const styles = StyleSheet.create({
  ad: {
    fontSize: 20,
    color: 'antiquewhite',
  },

  plaka: {
    fontSize: 20,
    color: 'antiquewhite',
    marginHorizontal: 10,
  },

  sponsor: {
    fontSize: 15,
    color: 'antiquewhite',
  },

  itemContainer: {
    backgroundColor: '#555555dd',
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 3,
    paddingHorizontal: 10,
  },
});
