import { Redirect, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MMKV } from 'react-native-mmkv';
import { useContext, useEffect, useState } from 'react';
import { ReRenderContext } from '../../context/ReRenderContext';

export const storage = new MMKV();

export default function ScreensLayout() {
  const [isFirst, setisFirst] = useState<boolean>(false);
  const insets = useSafeAreaInsets();
  const data = useContext(ReRenderContext);

  // console.log('(screens) _layout');

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
        uri: getImg(),
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
        style='inverted'
        backgroundColor='transparent'
        translucent={true}
        animated
      />
    </ImageBackground>
  );
}

const bgImg1 =
  'https://images.pexels.com/photos/8071161/pexels-photo-8071161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
const bgImg2 =
  'https://images.pexels.com/photos/32319577/pexels-photo-32319577.jpeg?_gl=1*1sr579c*_ga*MTA3ODU0OTE2LjE3Mzg5MDQ2NjE.*_ga_8JE65Q40S6*czE3NTIwNzUxNjUkbzMkZzEkdDE3NTIwNzUxOTAkajM1JGwwJGgw';
const bgImg3 =
  'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

function getImg() {
  const bgImgURI = storage.getString('bg-img-URL');
  if (bgImgURI) return bgImgURI;
  const images = [bgImg1, bgImg2, bgImg3];
  const getDate = new Date().getDate();
  if (getDate % 2 === 0) return images[0];
  else if (getDate % 3 === 0) return images[1];
  else return images[2];
}
