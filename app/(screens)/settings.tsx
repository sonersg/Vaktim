import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function Settings() {
  return (
    <View>
      <Text>HOME</Text>
      <Link href="/(screens)/citiesList">Settings</Link>
    </View>
  );
}
