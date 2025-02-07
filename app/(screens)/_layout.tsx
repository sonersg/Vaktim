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

  console.log('_layout screen');

  return (
    <ImageBackground
      source={{
        uri: storage.getString('bg-img-URL') || defaultBgImgUri,
      }}
      style={{
        flex: 1,
        backgroundColor: '#444',
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingHorizontal: 5,
      }}
      resizeMode='cover'
    >
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: 'transparent' },
          animation: 'slide_from_bottom',
          headerShown: false,
        }}
      >
        <Stack.Screen name='index' />
        <Stack.Screen name='citiesList' />
        <Stack.Screen name='qada' />
        <Stack.Screen name='qibla' />
        <Stack.Screen name='settings' />
        <Stack.Screen name='imsakiye' />
        <Stack.Screen name='holy' />
      </Stack>

      <StatusBar
        style='light'
        // backgroundColor='transparent'
        translucent={true}
      />
    </ImageBackground>
  );
}
