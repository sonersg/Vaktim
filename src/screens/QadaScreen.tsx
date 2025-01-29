// import React, { useState } from "react";
// import { View, StyleSheet, Text, TouchableHighlight } from "react-native";
// import { MMKVstorage } from "./CitiesListScreen";
// import { qadaTimeLabels } from "../iller";
// import getToday from "../../app/hooks/getToday";
// import moment from "moment";

// export default function QadaScreen() {
//   const [fajr, setfajr] = useState(MMKVstorage.getNumber("qada-fajr") || 0);
//   const [dhuhr, setdhuhr] = useState(MMKVstorage.getNumber("qada-dhuhr") || 0);
//   const [asr, setasr] = useState(MMKVstorage.getNumber("qada-asr") || 0);
//   const [maghrib, setmaghrib] = useState(
//     MMKVstorage.getNumber("qada-maghrib") || 0
//   );
//   const [isha, setisha] = useState(MMKVstorage.getNumber("qada-isha") || 0);
//   const [vitr, setvitr] = useState(MMKVstorage.getNumber("qada-vitr") || 0);
//   const [sawm, setsawm] = useState(MMKVstorage.getNumber("qada-sawm") || 0);
//   const [edited, setedited] = useState(
//     MMKVstorage.getString("last-edit") || ""
//   );

//   const themeColor = MMKVstorage.getString("theme-color") || "skyblue";

//   const states = [
//     {
//       name: "fajr",
//       state: fajr,
//       setstate: setfajr,
//     },
//     {
//       name: "dhuhr",
//       state: dhuhr,
//       setstate: setdhuhr,
//     },
//     {
//       name: "asr",
//       state: asr,
//       setstate: setasr,
//     },
//     {
//       name: "maghrib",
//       state: maghrib,
//       setstate: setmaghrib,
//     },
//     {
//       name: "isha",
//       state: isha,
//       setstate: setisha,
//     },
//     {
//       name: "vitr",
//       state: vitr,
//       setstate: setvitr,
//     },
//     {
//       name: "sawm",
//       state: sawm,
//       setstate: setsawm,
//     },
//   ];

//   function updateQada(
//     setQada: React.Dispatch<React.SetStateAction<number>>,
//     plusOrMines: string,
//     qada: string
//   ) {
//     // last edited
//     const lastEdit = getToday() + " ~ " + moment().format("HH:mm:ss");
//     MMKVstorage.set("last-edit", lastEdit);
//     setedited(lastEdit);

//     // increase, decrease
//     if (plusOrMines === "+") {
//       setQada((prv) => {
//         if (prv + 1 > 500) return 500;
//         MMKVstorage.set("qada-" + qada, prv + 1);
//         return prv + 1;
//       });
//     } else if (plusOrMines === "-") {
//       setQada((prv) => {
//         if (prv - 1 < 0) return 0;
//         MMKVstorage.set("qada-" + qada, prv - 1);
//         return prv - 1;
//       });
//     }
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.edit}>{edited}</Text>
//       {qadaTimeLabels.map((label, index) => (
//         <View key={index} style={styles.sectionContainer}>
//           <Text style={styles.text}>{label}:</Text>
//           <View style={styles.dRow}>
//             <TouchableHighlight
//               style={{
//                 backgroundColor: themeColor,
//                 paddingBottom: 5,
//                 paddingHorizontal: 25,
//                 borderRadius: 5,
//               }}
//               onPress={() =>
//                 updateQada(states[index].setstate, "-", states[index].name)
//               }
//             >
//               <Text style={styles.text}>-</Text>
//             </TouchableHighlight>

//             <Text style={styles.text}>{states[index].state}</Text>

//             <TouchableHighlight
//               style={{
//                 backgroundColor: themeColor,
//                 paddingBottom: 5,
//                 paddingHorizontal: 25,
//                 borderRadius: 5,
//               }}
//               onPress={() =>
//                 updateQada(states[index].setstate, "+", states[index].name)
//               }
//             >
//               <Text style={styles.text}>+</Text>
//             </TouchableHighlight>
//           </View>
//         </View>
//       ))}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#242424",
//     paddingHorizontal: 10,
//     justifyContent: "center",
//     gap: 30,
//   },

//   sectionContainer: {
//     display: "flex",
//     flexDirection: "row",
//     backgroundColor: "#444",
//     justifyContent: "space-between",
//     paddingHorizontal: 10,
//   },

//   dRow: {
//     flexDirection: "row",
//     width: "60%",
//     justifyContent: "space-between",
//   },

//   text: {
//     color: "white",
//     fontSize: 20,
//     fontWeight: "bold",
//   },

//   edit: {
//     textAlign: "center",
//     color: "#fff",
//   },
// });
