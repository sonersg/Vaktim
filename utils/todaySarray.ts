import prayerTimes from '../assets/minicik.json';
import { getTodayISO } from './todayISO';

export default function getTodaySarray() {
  const today = getTodayISO();
  const times = prayerTimes.Gaziantep.times;

  if (today in times) {
    return times[today as keyof typeof times];
  } else {
    return [];
  }
}
