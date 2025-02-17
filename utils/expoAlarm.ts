import {
  getAllAlarms,
  removeAlarm,
  removeAllAlarms,
  scheduleAlarm,
} from 'expo-alarm-module';
import useToast from './useToast';
import calculateArray from './calculate';
import { getISO } from './date';
import { storage } from '../app/(screens)/_layout';
import { PermissionsAndroid, Platform } from 'react-native';

const SIZE = 5;

// setAlarm function
export const setAlarm = async (prayer: number) => {
  const fiveArr = calculateArray(SIZE);
  if (fiveArr.length === 2) return;

  const now = new Date(); // Get the current date and time

  fiveArr.map(async (arr, index) => {
    const hr = +arr[prayer].slice(0, 2);
    const mn = +arr[prayer].slice(3, 5);

    const newDate = new Date();
    newDate.setDate(newDate.getDate() + index);
    // newDate.setHours(hr);
    newDate.setHours(hr);
    newDate.setMinutes(mn);
    newDate.setSeconds(0);

    // Check if the newDate is in the past
    if (newDate <= now) {
      console.log(`Skipping past date: ${newDate}`);
      // console.log(newDate, now);
      return; // Skip scheduling this alarm
    }

    await scheduleAlarm({
      uid: `${prayer}~${getISO(index)}`,
      day: newDate,
      title: arr[prayer],
      description: '',
      snoozeInterval: 5,
      repeating: false,
      active: true,
    } as any);
  });

  // console.log(await getAllAlarms());
};

// cancellAlarm function
export const cancellAlarm = async (index: number) => {
  useToast('Güncelleniyor');

  for (let i = 0; i < SIZE; i++) {
    await removeAlarm(`${index}~${getISO(i)}`);
  }

  // console.log(await getAllAlarms());
};

// resetAlarms function
export const resetAlarms = async () => {
  await removeAllAlarms();

  const bells = storage.getString('bells') || '111000';

  bells.split('').map(async (digit, index) => {
    if (digit === '1') {
      await setAlarm(index);
      // console.log(index);
    }
  });

  // console.log(await getAllAlarms());
  console.log('dddddddddddddddddddddddddddddddddddddd');
};

export async function testAlarm() {
  const newDate = new Date();
  newDate.setSeconds(newDate.getSeconds() + 4);

  await scheduleAlarm({
    uid: 'test',
    day: newDate,
    title: 'arr[prayer]',
    description: '',
    snoozeInterval: 5,
    repeating: false,
    active: true,
  } as any);
}

// requestNotificationPermissions function
export async function requestNotificationPermissions() {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: 'Notification Permission',
          message: 'App needs notification permission to show alarms',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the notifications');
        return true; // Permission granted
      } else {
        console.log('Notification permission denied');
        return false; // Permission denied
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  return true; // Permission granted by default on iOS or not needed
}
