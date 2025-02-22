import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { storage } from './_layout';
import Konsol from '../../components/Konsol';
import * as Linking from 'expo-linking';
import { Platform } from 'react-native';
import { Alert } from 'react-native';

const SettingsScreen = () => {
  const [themeColor, setthemeColor] = useState(
    storage.getString('theme-color') || 'skyblue'
  );
  const [locatn, setlocatn] = useState(
    storage.getString('auto-location') || 'on'
  );

  const setAndNotify = (key: string, value: string) => {
    // set storage
    storage.set(key, value);

    // set state
    if (key === 'theme-color') setthemeColor(value);
    if (key === 'auto-location') setlocatn(value);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#242424a4' }}>
      <ScrollView>
        <Konsol />

        <View style={styles.sectionContainer}>
          <Text style={styles.text}>Duvar Kağıdı:</Text>
          <Text style={{ color: 'white', textAlign: 'center' }}>
            Duvar kağıdı ayarlamak için internetten bulduğunuz herhangi bir
            fotoğrafı yeni sekmede açıp, linkini yukarıdaki alana
            yapıştırabilirsiniz.
          </Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.text}>Konum:</Text>
          <View style={styles.row}>
            <TouchableHighlight
              style={[
                styles.btn,
                styles.radioBtnLeft,
                { borderColor: themeColor },
                locatn === 'on' && {
                  backgroundColor: themeColor,
                },
              ]}
              onPress={() => setAndNotify('auto-location', 'on')}
            >
              <Text style={styles.text}>Açık</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={[
                styles.btn,
                styles.radioBtnRight,
                { borderColor: themeColor },
                locatn === 'off' && {
                  backgroundColor: themeColor,
                },
              ]}
              onPress={() => setAndNotify('auto-location', 'off')}
            >
              <Text style={styles.text}>Kapalı</Text>
            </TouchableHighlight>
          </View>
          <TouchableHighlight
            style={[styles.btn, { backgroundColor: themeColor }]}
            onPress={openAppSettings}
          >
            <Text style={styles.text}>Konum erişimine izin ver</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.text}>Bildirimler:</Text>
          <View style={styles.row}>
            <TouchableHighlight
              style={[styles.btn, { backgroundColor: themeColor }]}
              onPress={openAppSettings}
            >
              <Text style={styles.text}>Bildirimlere izin ver</Text>
            </TouchableHighlight>
          </View>
        </View>

        {/* <View style={styles.sectionContainer}>
          <Text style={styles.text}>Bir sonraki namaza kalan vakti:</Text>
          <View style={styles.row}>
            <TouchableHighlight
              style={[
                styles.btn,
                { borderColor: themeColor },
                highlight === 'always' && {
                  backgroundColor: themeColor,
                },
              ]}
              onPress={() => setAndNotify('show-times-when', 'always')}
            >
              <Text style={styles.text}>Her Zaman Göster</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={[
                styles.btn,
                { borderColor: themeColor },
                highlight === 'on-press' && {
                  backgroundColor: themeColor,
                },
              ]}
              onPress={() => setAndNotify('show-times-when', 'on-press')}
            >
              <Text style={styles.text}>Dokunduğunda Göster</Text>
            </TouchableHighlight>
          </View>
        </View> */}

        <View style={styles.sectionContainer}>
          <Text style={styles.text}>Bir renk seç?</Text>
          <View style={styles.row}>
            <TouchableHighlight
              style={[
                styles.btn,
                styles.radioBtnLeft,

                { borderColor: 'hotpink' },
                themeColor === 'hotpink' && {
                  backgroundColor: 'hotpink',
                },
              ]}
              onPress={() => setAndNotify('theme-color', 'hotpink')}
            >
              <Text style={styles.text}>Pembe</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={[
                styles.btn,
                styles.radioBtnRight,
                { borderColor: 'skyblue' },
                themeColor === 'skyblue' && {
                  backgroundColor: 'skyblue',
                },
              ]}
              onPress={() => setAndNotify('theme-color', 'skyblue')}
            >
              <Text style={styles.text}>Mavi</Text>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 3,
    padding: 10,
  },

  row: {
    flexDirection: 'row',
  },

  btn: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginTop: 13,
    borderWidth: 3,
    minWidth: '33%',
    alignItems: 'center',
  },

  radioBtnRight: {
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderLeftWidth: 0,
  },
  radioBtnLeft: {
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderRightWidth: 0,
  },

  text: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;

// Request Location Access Function
function openAppSettings() {
  // Handle different platforms
  if (Platform.OS === 'ios') {
    Linking.openURL('app-settings:'); // Opens iOS app settings
  } else if (Platform.OS === 'android') {
    // More robust method for Android (try multiple methods for different Android versions)
    try {
      Linking.openSettings(); // Try the most common settings page
    } catch (e) {
      // Fallback to a direct intent (more specific, less reliable)
      try {
        Linking.openURL('app-settings:');
      } catch (e) {
        // Last resort - open app details page which contains permission settings
        console.error('Could not open app settings: ', e);
      }
    }
  } else {
    // Handle other platforms (e.g., web) - usually settings aren't accessible directly.
    Alert.alert(
      'Platform Not Supported',
      'Please enable location permissions manually in your device settings.'
    );
  }
}
