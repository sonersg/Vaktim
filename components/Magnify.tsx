import { Pressable, StyleSheet } from 'react-native';
import React, { memo } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import { storage } from '../app/(screens)/_layout';
import useToast from '../utils/useToast';

interface IMagnifyProps {
  remaining: string;
  themeColor: string;
}

const Magnify = ({ remaining, themeColor }: IMagnifyProps) => {
  const fontSize = useSharedValue(22);

  // useEffect(() => {
  //   fontSize.value = withRepeat(withTiming(44, { duration: 2222 }), -1, true);
  // }, []);

  function handleLong() {
    const storedIsAlways = storage.getString('is-always') || 'yes';
    if (storedIsAlways === 'yes') {
      // Alert.alert('Restart the app', 'to hide remaining');
      useToast('Restart the app to hide remaining');
      storage.set('is-always', 'no');
    } else {
      // Alert.alert('Restart the app', 'to show remaining always');
      useToast('Restart the app to show remaining always');
      storage.set('is-always', 'yes');
    }
  }

  function zoomInOut() {
    fontSize.value = withSequence(
      withSpring(44),
      withDelay(999, withSpring(22))
    );
  }

  const animatedStyle = useAnimatedStyle(() => {
    return {
      fontSize: fontSize.value,
    };
  });

  return (
    <Pressable onPress={zoomInOut} onLongPress={handleLong}>
      <Animated.Text
        style={[styles.remainingStyle, { color: themeColor }, animatedStyle]}
      >
        {remaining}
      </Animated.Text>
    </Pressable>
  );
};

export default memo(Magnify);

const styles = StyleSheet.create({
  remainingStyle: {
    color: 'white',
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#33333399',
    fontWeight: 'bold',
    borderWidth: 3,
    borderColor: '#777',
    borderRadius: 15,
  },
});
