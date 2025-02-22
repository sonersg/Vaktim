import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Compass from './Compass';

interface IMenuProps {
  menuVisible: boolean;
}
function Menu({ menuVisible }: IMenuProps) {
  const router = useRouter();
  const bottom = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (menuVisible) {
      // bottom.value = withSpring(150, {
      //   mass: 1,
      //   stiffness: 100,
      //   damping: 5, //also known as friction
      // }); // Animate to 100
      bottom.value = withSpring(-10); // Animate to 100
      opacity.value = withSpring(1); // Animate to 100
    } else {
      bottom.value = withSpring(-90); // Animate to 0
      opacity.value = withSpring(0); // Animate to 100
    }
  }, [menuVisible]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      bottom: bottom.value, // Animate height
      opacity: opacity.value,
    };
  });

  // console.log(menuVisible);

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => router.push('qada')}
        >
          <Text style={{ fontSize: 44 }}>📒</Text>
          <Text style={{ color: 'white' }}>Kaza Takibi</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => router.push('qibla')}
        >
          {menuVisible && <Compass />}
          <Text style={{ color: 'white' }}>Kıble</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => router.push('settings')}
        >
          <Text style={{ fontSize: 44 }}>✨</Text>
          <Text style={{ color: 'white' }}>Ayarlar</Text>
        </TouchableOpacity>
      </View>

      {/* <View style={styles.row}>
        <View>
          <Text>item 4 </Text>
        </View>
        <View>
          <Text>item 5 </Text>
        </View>
        <View>
          <Text>item 6 </Text>
        </View>
      </View> */}
    </Animated.View>
  );
}

export default Menu;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: -10,
    height: 140,
    width: '100%',
    backgroundColor: '#33333399',
    padding: 10,
    borderRadius: 30,
  },

  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // backgroundColor: 'green',
  },

  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    width: 88,
  },
});
