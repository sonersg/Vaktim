import { Alert, Pressable, StyleSheet } from 'react-native';
import React, { memo } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import { storage } from '../app/(screens)/_layout';

interface IMagnifyProps {
  remaining: string;
  themeColor: string;
}

const Magnify = ({ remaining, themeColor }: IMagnifyProps) => {
  const fontSize = useSharedValue(22);

  function handleLong() {
    const currentIsAlways = storage.getBoolean('is-always');
    if (currentIsAlways) {
      Alert.alert('Uygulamayı Yeniden Açın', 'Dokunduğunda Göster');
      storage.set('is-always', false);
    } else if (!currentIsAlways) {
      Alert.alert('Uygulamayı Yeniden Açın', 'Her zaman Göster');
      // useToast('Her zaman göster');
      storage.set('is-always', true);
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
