import { ToastAndroid } from 'react-native';

export default function useToast(message: string) {
  return ToastAndroid.showWithGravity(
    message,
    ToastAndroid.SHORT,
    ToastAndroid.TOP
  );
}
