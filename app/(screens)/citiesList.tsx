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
    const favsArr = getFavs() || [];
    const concated = favsArr.concat(iller);
    setconcatedArr(concated);
  }, []);

  async function handleItemPress(cityName: string, code: string) {
    if (cityName === '--') return;
    storage.set('selected-city', cityName);
    setFavs(cityName, code);
    router.back();
  }

  return (
    <FlatList
      data={concatedArr}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => handleItemPress(item.name, item.code)}
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

// import React, { useContext } from 'react';
// import {
//   FlatList,
//   StyleSheet,
//   Text,
//   Alert,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { MMKV } from 'react-native-mmkv';
// import { ReRenderContext } from '../context/ReRenderContext';
// import { iller } from '../../data/iller';
// import setNotificationArguments from '../notifee/setTriggerNotification';
// import useToast from '../../app/hooks/useToast';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// export const storage = new MMKV();

// export async function fetchPrayerTimes(city: string, today: string) {
//   try {
//     const res = await fetch(
//       `https://namaz-vakti.vercel.app/api/timesFromPlace?country=Turkey&region=${city}&city=${city}&date=${today}&days=30&timezoneOffset=180&calculationMethod=Turkey`
//     );

//     const data = await res.json();

//     if (!data.error) {
//       const stringifiedData = JSON.stringify(data);
//       storage.set('stringified-prayer-times-object', stringifiedData);
//       useToast('Güncellendi');
//       await setNotificationArguments(data);
//     } else if (data.error) {
//       useToast(data.error);
//     }
//   } catch (error) {
//     useToast('İnternet bağlantınızı kontrol edin!');
//   }
// }

// const CitiesList = () => {
// const { setReRender } = useContext(ReRenderContext);
// const insets = useSafeAreaInsets();

// handleItemPress Function
// function handleItemPress(city: string, sponsor: string) {
//   Alert.alert(
//     '',
//     `${city} için 30 günlük namaz vakitlerini güncellemek istiyor musunuz?`,
//     [
//       {
//         text: 'İptal',
//         onPress: () => {
//           useToast('İptal edildi.');
//         },
//         style: 'cancel',
//       },
//       {
//         text: 'Tamam',
//         onPress: () => {
//           fetchPrayerTimes(city, new Date().toISOString().slice(0, 10));
//           storage.set('sponsor-of-the-city', sponsor);
//           useToast('Güncelleniyor!');
//           // invoke rerendering with context api
//           setTimeout(() => setReRender((prev) => !prev), 3000);
//         },
//       },
//     ]
//   );
// }
// };
