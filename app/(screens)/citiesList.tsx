import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { Link, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { iller } from '../../assets/iller';
import useToast from '../../utils/useToast';
import { MMKV } from 'react-native-mmkv';

export const MMKVstorage = new MMKV();

export default function CitiesList() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  async function handleItemPress() {
    useToast('Vakitler yükleniyor.');
    router.back();
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#242424',
        paddingHorizontal: 10,
        // Paddings to handle safe area
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <FlatList
        data={iller}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => handleItemPress()}
          >
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.ad}>{item.ad}</Text>
              <Text style={styles.plaka}>{item.plaka}</Text>
            </View>
            <Text style={styles.sponsor}>{item.sponsor}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
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
    backgroundColor: '#555',
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
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

// export const MMKVstorage = new MMKV();

// export async function fetchPrayerTimes(city: string, today: string) {
//   try {
//     const res = await fetch(
//       `https://namaz-vakti.vercel.app/api/timesFromPlace?country=Turkey&region=${city}&city=${city}&date=${today}&days=30&timezoneOffset=180&calculationMethod=Turkey`
//     );

//     const data = await res.json();

//     if (!data.error) {
//       const stringifiedData = JSON.stringify(data);
//       MMKVstorage.set('stringified-prayer-times-object', stringifiedData);
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
//           MMKVstorage.set('sponsor-of-the-city', sponsor);
//           useToast('Güncelleniyor!');
//           // invoke rerendering with context api
//           setTimeout(() => setReRender((prev) => !prev), 3000);
//         },
//       },
//     ]
//   );
// }
// };
