import { storage } from '../app/(screens)/_layout';
import prayerTimes from '../assets/minicik.json';
import { getTodayISO } from './todayISO';
import useToast from './useToast';

export default function getTodaySarray() {
  console.log('todaysSarrya called');
  const currentCity = storage.getString('selected-city') || '';

  if (currentCity === '') return [];

  const today = getTodayISO();
  const keys = Object.keys(prayerTimes);

  let times;
  if (keys.includes(currentCity)) {
    //@ts-ignore
    times = prayerTimes[currentCity].times;
  } else {
    useToast('O şehir ne taraftaydı?');
    return [];
  }

  if (today in times) {
    return times[today as keyof typeof times];
  } else {
    return [];
  }
}
