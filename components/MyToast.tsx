import { View, Text, StyleSheet } from 'react-native';
import React, { memo, useEffect, useState } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
} from 'react-native-reanimated';

interface IMyToast {
  // isVisible?: boolean;
  toast?: string;
}
const MyToast = ({ toast }: IMyToast) => {
  // const [text, settext] = useState(toast);
  // const [opacity, setopacity] = useState(0);

  const zIndex = useSharedValue(-1);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (toast !== '') {
      opacity.value = withSequence(
        withSpring(1),
        withDelay(999, withSpring(0))
      );
    }
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      zIndex: zIndex.value,
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Text style={styles.text}>{toast}</Text>
    </Animated.View>
  );
};

export default memo(MyToast);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 15,
    left: 10,
    right: 10,
    paddingVertical: 5,
    // backgroundColor: 'red',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // zIndex: -1,
  },

  text: {
    color: 'white',
    backgroundColor: 'green',
    fontSize: 20,
    textAlign: 'center',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
});
