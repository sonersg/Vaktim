import { Pressable, StyleSheet } from 'react-native';
import React, { memo, useContext } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import { storage } from '../app/(screens)/_layout';
import useToast from '../utils/useToast';
import { ReRenderContext } from '../context/ReRenderContext';

interface IMagnifyProps {
  remaining: string;
  themeColor: string;
}

const Magnify = ({ remaining, themeColor }: IMagnifyProps) => {
  const fontSize = useSharedValue(22);
  const data = useContext(ReRenderContext);

  // useEffect(() => {
  //   fontSize.value = withRepeat(withTiming(44, { duration: 2222 }), -1, true);
  // }, []);

  function handleLong() {
    const storedIsAlways = storage.getBoolean('is-always');
    if (storedIsAlways) {
      // Alert.alert('Restart the app', 'to hide remaining');
      useToast('Remaining time is hidden');
      storage.set('is-always', false);
      data.setreRender((prev) => !prev);
    } else {
      useToast('Show remaining time always');
      storage.set('is-always', true);
      data.setreRender((prev) => !prev);
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
