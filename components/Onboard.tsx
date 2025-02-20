import React from 'react';
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
} from 'react-native';
import { storage } from '../app/(screens)/_layout';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { getLocationPermission } from '../utils/location';
import { requestNotificationPermissions } from '../utils/expoAlarm';

const { width, height } = Dimensions.get('window');

const COLORS = { primary: '#282534', white: '#ddd' };

const slides = [
  {
    id: '1',
    image: require('../assets/location.png'),
    title: 'Konum',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: '2',
    image: require('../assets/bell.png'),
    title: 'Bildirimler',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: '3',
    image: require('../assets/splash-icon.png'),
    title: 'Increase Your Value',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];

interface Item {
  id: string;
  image: any;
  title: string;
  subtitle: string;
}
interface SlideProps {
  item: Item;
}

const OnboardingScreen = ({ setonboard }: any) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef<FlatList<Item> | null>(null);

  const opacity = useSharedValue(1);

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
    const nextSlideIndex = (await currentSlideIndex) + 1;
    if (nextSlideIndex != slides.length) {
      const offset = (await nextSlideIndex) * width;
      await ref?.current?.scrollToOffset({ offset });
      await setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const Slide = ({ item }: SlideProps) => {
    return (
      <View
        style={{ alignItems: 'center', justifyContent: 'space-around', width }}
      >
        <Image
          source={item?.image}
          style={{ height: '33%', resizeMode: 'contain' }}
        />
        <View>
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
              style={styles.btn}
              onPress={() => {
                storage.set('onboard', true);
                opacity.value = withTiming(0.3);
                // setonboard(true);
              }}
            >
              <Text style={{ fontWeight: 'bold', fontSize: 22 }}>Başla</Text>
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
};

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
export default OnboardingScreen;
