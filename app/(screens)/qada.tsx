import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function Qada() {
  return (
    <View>
      <Text>HOME</Text>
      <Link href="/(screens)/citiesList">Qada</Link>
    </View>
  );
}
