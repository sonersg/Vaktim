import React, { useEffect } from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { storage } from '../app/(screens)/_layout';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { getCurrentLocation, getLocationPermission } from '../utils/location';
import { requestNotificationPermissions } from '../utils/expoAlarm';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');
const COLORS = { primary: '#282534', white: '#ddd' };

const slides = [
  {
    id: 1,
    image: require('../assets/location.png'),
    imgHeight: '33%',
    title: 'Konum',
    subtitle:
      'Bulunduğunuz konuma göre doğru namaz vakitlerini belirleyebilmek için, uygulamanın konum bilgilerinize erişmesi gerekmektedir.',
  },
  {
    id: 2,
    image: require('../assets/bell.png'),
    imgHeight: '33%',
    title: 'Bildirimler',
    subtitle:
      'Namaz vakitlerinde bildirim almak istiyorsanız, bildirim izinlerini açmalısınız. Bildirimler sonradan kapatılabilir.',
  },
  {
    id: 3,
    image: require('../assets/splash-icon.png'),
    imgHeight: '55%',
    title: '',
    subtitle: '',
  },
];

interface Item {
  id: number;
  image: any;
  imgHeight: any;
  title: string;
  subtitle: string;
}
interface SlideProps {
  item: Item;
}

export default function OnboardingScreen() {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const [city, setcity] = React.useState('');
  const ref = React.useRef<FlatList<Item> | null>(null);
  const router = useRouter();

  const opacity = useSharedValue(1);

  useEffect(() => {
    (async () => {
      if (currentSlideIndex === 2) {
        setcity('--');
        await getCurrentLocation();
        setcity(storage.getString('selected-city') || '');
      }
    })();
  }, [currentSlideIndex]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const updateCurrentSlideIndex = (e: any) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = async () => {
    // console.log(currentSlideIndex);

    if (currentSlideIndex === 0) {
      await getLocationPermission();
    } else if (currentSlideIndex === 1) {
      await requestNotificationPermissions();
    }

    const nextSlideIndex = currentSlideIndex + 1;
    const offset = nextSlideIndex * width;
    ref?.current?.scrollToOffset({ offset });
    setCurrentSlideIndex(currentSlideIndex + 1);
  };
  // console.log(currentSlideIndex);

  function onStart() {
    if (city === '--') return;
    storage.set('is-first', false);
    opacity.value = withTiming(0.3);
    router.replace('/');
  }

  const Slide = ({ item }: SlideProps) => {
    return (
      <View
        style={{ alignItems: 'center', justifyContent: 'space-around', width }}
      >
        <Image
          source={item?.image}
          style={{ height: item.imgHeight, resizeMode: 'contain' }}
        />
        <View>
          <Text style={styles.title}>{item.id === 3 ? city : item.title}</Text>
          <Text style={styles.subtitle}>{item?.subtitle}</Text>
        </View>

        <Footer />

        {city === '--' && (
          <ActivityIndicator
            size='large'
            color='#eee'
            style={{
              position: 'absolute',
              top: 111,
              transform: [{ scale: 3 }],
            }}
          />
        )}
      </View>
    );
  };

  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.25,
          width: width,
          justifyContent: 'space-around',
          paddingHorizontal: 55,
        }}
      >
        {/* Render buttons */}
        <View>
          {currentSlideIndex == slides.length - 1 ? (
            <TouchableOpacity style={styles.btn} onPress={onStart}>
              <Text style={{ fontWeight: 'bold', fontSize: 22 }}>BAŞLA</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.btn,
                {
                  borderColor: COLORS.white,
                  borderWidth: 1,
                  backgroundColor: 'transparent',
                },
              ]}
              onPress={goToNextSlide}
            >
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 22,
                  color: COLORS.white,
                }}
              >
                İZİN VER
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Indicator container */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          {/* Render indicator */}
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor: 'white',
                  width: 25,
                },
              ]}
            />
          ))}
        </View>
      </View>
    );
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <StatusBar backgroundColor={COLORS.primary} barStyle='light-content' />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({ item }) => <Slide item={item} />}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 55,
    backgroundColor: COLORS.primary,
  },
  subtitle: {
    color: COLORS.white,
    fontSize: 13,
    marginTop: 10,
    maxWidth: '70%',
    textAlign: 'center',
    lineHeight: 23,
  },
  title: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 44,
    textAlign: 'center',
  },
  indicator: {
    height: 3,
    width: 10,
    backgroundColor: 'grey',
    marginHorizontal: 3,
    borderRadius: 2,
  },
  btn: {
    // flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
