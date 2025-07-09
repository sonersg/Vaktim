import { Stack } from 'expo-router';
import ReRenderProvider from '../context/ReRenderContext';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(screens)',
};

export default function RootLayout() {
  return (
    <ReRenderProvider>
      <Stack>
        <Stack.Screen name='(screens)' options={{ headerShown: false }} />
        <Stack.Screen name='onboarding' options={{ headerShown: false }} />
        <Stack.Screen name='modal' options={{ presentation: 'modal' }} />
      </Stack>
    </ReRenderProvider>
  );
}
