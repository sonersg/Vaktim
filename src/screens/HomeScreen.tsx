// import React, { useContext, useState } from "react";
// import {
//   StyleSheet,
//   Pressable,
//   ImageBackground,
//   StatusBar,
//   ScrollView,
//   View,
// } from "react-native";
// import Menu from "../components/Menu";
// import PrayerTimesTable from "../components/PrayerTimesTable";
// import Calendar from "../components/Calendar";
// import { MMKVstorage } from "./CitiesListScreen";
// import { ReRenderContext } from "../context/ReRenderContext";

// const defaultBgImgUri =
//   "https://images.pexels.com/photos/8071161/pexels-photo-8071161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

// type HomeScreenProps = {
//   navigation: any;
// };

// const HomeScreen = ({ navigation }: HomeScreenProps) => {
//   const [menuVisible, setmenuVisible] = useState(false);
//   const data = useContext(ReRenderContext);

//   return (
//     <ImageBackground
//       source={{
//         uri: MMKVstorage.getString("bg-img-URL") || defaultBgImgUri,
//       }}
//       style={{ flex: 1, backgroundColor: "#242424" }}
//       resizeMode="cover"
//     >
//       <Pressable
//         style={styles.mainContainer}
//         onPress={() => setmenuVisible((prev) => !prev)}
//       >
//         <View>
//           <ScrollView>
//             <Calendar navigation={navigation} />

//             <PrayerTimesTable navigation={navigation} />
//           </ScrollView>
//         </View>
//         {menuVisible && <Menu navigation={navigation} />}
//       </Pressable>

//       <StatusBar
//         // animated={true}
//         backgroundColor="#242424"
//         barStyle="light-content"
//         // showHideTransition="slide"
//         // hidden={false}
//         // translucent={false}
//       />
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     justifyContent: "center",
//     // for some reason "alignItems" cancelled "justifyContent"
//   },

//   text: {
//     color: "antiquewhite",
//     fontWeight: "bold",
//     fontSize: 17,
//   },

//   btn: {
//     backgroundColor: "skyblue",
//     padding: 10,
//     margin: 10,
//     paddingHorizontal: 15,
//     borderRadius: 10,
//   },

//   emoji: {
//     fontSize: 50,
//   },
// });

// export default HomeScreen;
