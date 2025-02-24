import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { resetAlarms } from '../utils/expoAlarm';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(screens)',
};

export default function RootLayout() {
  useEffect(() => {
    resetAlarms();
  }, []);

  return (
    <Stack>
      <Stack.Screen name='(screens)' options={{ headerShown: false }} />
      <Stack.Screen name='onboarding' options={{ headerShown: false }} />
      <Stack.Screen name='modal' options={{ presentation: 'modal' }} />
    </Stack>
  );
}
