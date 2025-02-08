import { Pressable, StyleSheet } from 'react-native';
import React, { memo } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
} from 'react-native-reanimated';

interface IMagnifyProps {
  remaining: string;
  themeColor: string;
}

const Magnify = ({ remaining, themeColor }: IMagnifyProps) => {
  const fontSize = useSharedValue(20);

  function zoomInOut() {
    fontSize.value = withSequence(
      withSpring(44),
      withDelay(999, withSpring(20))
    );
  }

  const animatedStyle = useAnimatedStyle(() => {
    return {
      fontSize: fontSize.value, // Animate the fontSize
    };
  });

  return (
    <Pressable onPress={zoomInOut}>
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
