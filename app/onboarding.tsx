import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { storage } from '../app/(screens)/_layout';
import { getCurrentLocation, getLocationPermission } from '../utils/location';
import { requestNotificationPermissions } from '../utils/expoAlarm';
import { useRouter } from 'expo-router';
import MyModal from '../components/MyModal';

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
    imgHeight: '33%',
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
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [modalVisible, setmodalVisible] = useState(false);
  const [calcMethod, setcalcMethod] = useState('Türkiye');
  const [city, setcity] = useState('');
  const ref = useRef<FlatList<Item> | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (currentSlideIndex > 0) {
      const sc = storage.getString('selected-city');
      if (sc) setcity(sc);
    }
  }, [currentSlideIndex, modalVisible, calcMethod]);

  const updateCurrentSlideIndex = (e: any) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = async () => {
    // console.log(currentSlideIndex);

    if (currentSlideIndex === 0) {
      await getLocationPermission();
      getCurrentLocation();
    } else if (currentSlideIndex === 1) {
      await requestNotificationPermissions();
    }

    const nextSlideIndex = currentSlideIndex + 1;
    const offset = nextSlideIndex * width;
    ref?.current?.scrollToOffset({ offset });
    setCurrentSlideIndex(currentSlideIndex + 1);
  };

  function onStart() {
    storage.set('is-first', false);
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

        {item.id === 3 && (
          <>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => setmodalVisible(true)}
            >
              <Text style={{ color: COLORS.white }}>
                Hesaplama Yöntemi: {calcMethod} 🔻
              </Text>
            </TouchableOpacity>

            <Text style={styles.title}>{city}</Text>
          </>
        )}

        <View style={item.id === 3 && { display: 'none' }}>
          <Text style={styles.title}>{item?.title}</Text>
          <Text style={styles.subtitle}>{item?.subtitle}</Text>
        </View>

        <Footer />
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
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: COLORS.white }]}
              onPress={onStart}
            >
              <Text style={{ fontWeight: 'bold', fontSize: 22 }}>BAŞLA</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.btn}
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
                  width: 22,
                },
              ]}
            />
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({ item }) => <Slide item={item} />}
      />

      <MyModal
        modalVisible={modalVisible}
        setmodalVisible={setmodalVisible}
        calcMethod={calcMethod}
        setcalcMethod={setcalcMethod}
      />

      <StatusBar backgroundColor={COLORS.primary} barStyle='light-content' />
    </View>
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
    fontSize: 14,
    maxWidth: '77%',
    textAlign: 'center',
    lineHeight: 23,
  },
  title: {
    color: COLORS.white,
    fontSize: 22,
    marginVertical: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  indicator: {
    height: 5,
    width: 11,
    backgroundColor: 'grey',
    marginHorizontal: 3,
    borderRadius: 2,
  },
  btn: {
    // flex: 1,
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 22,
    borderColor: COLORS.white,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
