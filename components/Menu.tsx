import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface IMenuProps {
  menuVisible: boolean;
}
function Menu({ menuVisible }: IMenuProps) {
  const router = useRouter();
  const height = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (menuVisible) {
      // height.value = withSpring(150, {
      //   mass: 1,
      //   stiffness: 100,
      //   damping: 5, //also known as friction
      // }); // Animate to 100
      height.value = withSpring(150); // Animate to 100
      opacity.value = withSpring(1); // Animate to 100
    } else {
      height.value = withSpring(55); // Animate to 0
      opacity.value = withSpring(0); // Animate to 100
    }
  }, [menuVisible]); // Only run this effect when menuVisible changes

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value, // Animate height
      opacity: opacity.value,
    };
  });

  // console.log(menuVisible);

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => router.push('qada')}>
          <View style={styles.itemContainer}>
            <Text style={{ fontSize: 50 }}>📒</Text>
            <Text style={{ color: 'white' }}>Kaza Takibi</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('qibla')}>
          <View style={styles.itemContainer}>
            <Text style={{ fontSize: 50 }}>🧭</Text>
            <Text style={{ color: 'white' }}>Kıble</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('settings')}>
          <View style={styles.itemContainer}>
            <Text style={{ fontSize: 50 }}>💬</Text>
            <Text style={{ color: 'white' }}>Ayarlar</Text>
          </View>
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
    display: 'flex',
    position: 'absolute',
    bottom: -20,
    width: '100%',
    backgroundColor: '#33333399',
    padding: 10,
    borderRadius: 30,
  },

  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 5,
    marginVertical: 5,
  },

  btn: {
    backgroundColor: 'skyblue',
    padding: 10,
    margin: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },

  itemContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
