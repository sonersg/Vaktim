import { Text, View, Button, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

async function fetchPrayerTimes() {
  // Replace with your logic to fetch prayer times
  return [
    '2025-01-18T05:00:00Z', // Fajr
    '2025-01-18T12:00:00Z', // Dhuhr
    '2025-01-18T15:00:00Z', // Asr
    '2025-01-18T18:00:00Z', // Maghrib
    '2025-01-18T19:30:00Z', // Isha
  ].map((time) => new Date(time));
}

export async function schedulePushNotification() {
  await Notifications.cancelAllScheduledNotificationsAsync();
  // const tm = new Date(Date.now() + 10 * 1000);
  const newDate = new Date();
  newDate.setSeconds(newDate.getSeconds() + 3);

  // const tomorrow = new Date();
  // tomorrow.setDate(tomorrow.getDate());
  // tomorrow.setHours(0, 1, 0, 0);

  console.log(newDate);

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here', test: { test1: 'more data' } },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: newDate,
      channelId: 'myNotificationChannel',
    },
  });
}

export async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('myNotificationChannel', {
      name: 'A channel is needed for the permissions prompt to appear',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');
    return;
  }
}
