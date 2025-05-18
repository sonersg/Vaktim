import { Redirect, Stack, useGlobalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MMKV } from 'react-native-mmkv';
import { useEffect, useState } from 'react';

export const storage = new MMKV();

const defaultBgImgURI =
  'https://images.pexels.com/photos/8071161/pexels-photo-8071161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
// const defaultBgImgURI =
//   'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

const bgImgURI = storage.getString('bg-img-URL') || defaultBgImgURI;

export default function ScreensLayout() {
  const [isFirst, setisFirst] = useState<boolean>(false);

  const insets = useSafeAreaInsets();
  const params = useGlobalSearchParams();
  const updateTrigger = params.updateTrigger;
  console.log('_layout screen: ', updateTrigger);

  useEffect(() => {
    const tmout = setTimeout(() => {
      const a = storage.getBoolean('is-first');
      a === undefined && setisFirst(true);
    }, 555);

    return () => clearTimeout(tmout);
  }, []);

  if (isFirst) return <Redirect href='/onboarding' />;

  return (
    <ImageBackground
      source={{
        uri: bgImgURI,
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
