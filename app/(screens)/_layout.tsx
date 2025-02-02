import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();
const defaultBgImgUri =
  'https://images.pexels.com/photos/8071161/pexels-photo-8071161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

export default function ScreensLayout() {
  const insets = useSafeAreaInsets();

  return (
    <ImageBackground
      source={{
        uri: storage.getString('bg-img-URL') || defaultBgImgUri,
      }}
      style={{
        flex: 1,
        backgroundColor: '#242424',
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingHorizontal: 10,
      }}
      resizeMode='cover'
    >
      <Stack
        screenOptions={{
          // headerTransparent: true,
          // headerShadowVisible: false,
          contentStyle: { backgroundColor: 'transparent' },
          animation: 'slide_from_bottom',
        }}
      >
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='citiesList' options={{ headerShown: false }} />
        <Stack.Screen name='qada' options={{ headerShown: false }} />
        <Stack.Screen name='qibla' options={{ headerShown: false }} />
        <Stack.Screen name='settings' options={{ headerShown: false }} />
      </Stack>

      <StatusBar
        style='dark'
        backgroundColor='transparent'
        translucent={true}
      />
    </ImageBackground>
  );
}
