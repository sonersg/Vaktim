import React from "react";
import { StyleSheet, Text, ScrollView, View } from "react-native";
import getParsedPrayerTimes from "../../app/hooks/getParsedPrayerTimes";
import getToday from "../../app/hooks/getToday";
import getHijri from "../../app/hooks/getHijri";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MMKVstorage } from "./CitiesListScreen";

const ImsakiyeScreen = () => {
  const insets = useSafeAreaInsets();

  const themeColor = MMKVstorage.getString("theme-color") || "skyblue";
  const today = new Date().toISOString().slice(0, 10);
  const timesObject = getParsedPrayerTimes();

  if (timesObject?.times[today]) {
    const keysArray = Object.keys(timesObject.times);
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#242424",
          paddingHorizontal: 10,
          justifyContent: "center",
          alignItems: "center",
          // Paddings to handle safe area
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {getToday()} - {getHijri()}
          </Text>
        </View>
        <ScrollView>
          {keysArray.map((date, index) => (
            <View
              key={index}
              style={[
                styles.displayRow,
                date === today && styles.highlightToday,
              ]}
            >
              <Text style={[styles.text, { color: themeColor }]}>{date}</Text>
              {timesObject.times[date].map((time, index2) => (
                <Text
                  key={index2}
                  style={[
                    styles.text,
                    index2 % 2 !== 0 && { color: themeColor },
                  ]}
                >
                  {time}
                </Text>
              ))}
            </View>
          ))}
          <Text></Text>
        </ScrollView>
      </View>
    );
  } else {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#242424",
          paddingHorizontal: 10,
          justifyContent: "center",
          alignItems: "center",
          // Paddings to handle safe area
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
      >
        <Text style={styles.text}>Vakitleri güncelleyiniz.</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  text: {
    color: "white",
    margin: 3,
  },

  displayRow: {
    display: "flex",
    flexDirection: "row",
  },

  highlightToday: {
    backgroundColor: "green",
  },

  header: {
    backgroundColor: "green",
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginVertical: 20,
  },

  headerText: {
    fontWeight: "bold",
    color: "white",
  },
});

export default ImsakiyeScreen;
