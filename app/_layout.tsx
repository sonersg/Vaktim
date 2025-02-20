import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  requestNotificationPermissions,
  resetAlarms,
} from '../utils/expoAlarm';
import Onboard from '../components/Onboard';
import { storage } from './(screens)/_layout';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(screens)',
};

//////////////////////////////////////////7
//////////////////////////////////////////7
//////////////////////////////////////////7
export default function RootLayout() {
  // const [onboard, setonboard] = useState(true);

  useEffect(() => {
    // setonboard(storage.getBoolean('onboard') || false);
    resetAlarms();
  }, []);

  // if (!onboard) return <Onboard setonboard={setonboard} />;

  return (
    <Stack>
      <Stack.Screen name='(screens)' options={{ headerShown: false }} />
      <Stack.Screen name='onboarding' options={{ headerShown: false }} />
      <Stack.Screen name='modal' options={{ presentation: 'modal' }} />
    </Stack>
  );
}
