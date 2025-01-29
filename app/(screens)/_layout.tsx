import { Stack } from "expo-router";

export default function ScreensLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="citiesList" options={{ headerShown: false }} />
      <Stack.Screen name="qada" options={{ headerShown: false }} />
      <Stack.Screen name="qibla" options={{ headerShown: false }} />
      <Stack.Screen name="settings" options={{ headerShown: false }} />
    </Stack>
  );
}
