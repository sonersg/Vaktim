import moment from 'moment-timezone';
import { storage } from '../app/(screens)/_layout';
// import { IPrayerTimesObject } from '../../src/types/sampleObjectType';
// import { storage } from '../../src/screens/CitiesListScreen';

// type getTimesType = {
//   time: number;
//   timeLeft: string;
// };

// function getTimes(
//   parsedPrayerTimesObject: IPrayerTimesObject | undefined
// ): getTimesType {

//   if (parsedPrayerTimesObject) {
//     const date = new Date();
//     const todayAsISOString = date.toISOString().slice(0, 10);
//     const currentTimeValue = moment().format('HH:mm');
//     const todaySarray = parsedPrayerTimesObject.times[todayAsISOString] || [];

//     if (currentTimeValue >= todaySarray[5]) {
//       return { time: -1, timeLeft: ishaMessage };
//     }

//     for (let i = 0; i < todaySarray.length; i++) {
//       const prayerTime = todaySarray[i];
//       if (currentTimeValue <= prayerTime) {
//         const [currentHours, currentMinutes] = currentTimeValue.split(':');
//         const [prayerHours, prayerMinutes] = prayerTime.split(':');

//         const totalMinutes1 = +currentHours * 60 + +currentMinutes;
//         const totalMinutes2 = +prayerHours * 60 + +prayerMinutes;

//         const minutesDifference = totalMinutes2 - totalMinutes1;

//         const hoursLeft = Math.floor(minutesDifference / 60);
//         const minutesLeft = minutesDifference % 60;

//         return { time: i, timeLeft: `${hoursLeft}:${minutesLeft}` };
//       }
//     }
//   }
//   return { time: -1, timeLeft: 'error' };
// }

export function getRemaining(todaySarray: string[]) {
  if (todaySarray.length < 5) return 'ah sana array';
  const ishaMessage = storage.getString('isha-message') || '--';

  const currentTime = moment().format('HH:mm');
  const currentTimeValue = +currentTime.replace(':', '');
  const ishaTimeValue = +todaySarray[5].replace(':', '');
  if (currentTimeValue >= ishaTimeValue) return ishaMessage;

  for (let i = 0; i < todaySarray.length; i++) {
    const prayerTimeValue = +todaySarray[i].replace(':', '');

    if (currentTimeValue <= prayerTimeValue) {
      const [currentHours, currentMinutes] = currentTime.split(':');
      const [prayerHours, prayerMinutes] = todaySarray[i].split(':');

      const totalMinutes1 = +currentHours * 60 + +currentMinutes;
      const totalMinutes2 = +prayerHours * 60 + +prayerMinutes;

      const minutesDifference = totalMinutes2 - totalMinutes1;

      const hoursLeft = Math.floor(minutesDifference / 60).toString();
      let minutesLeft = (minutesDifference % 60).toString();
      if (+minutesLeft < 10) minutesLeft = `0${minutesLeft}`;

      if (hoursLeft === '0') return `${minutesLeft}`;
      return `${hoursLeft}:${minutesLeft}`;
    }
  }
}

export function getHighlightedIndex(todaySarray: string[]) {
  if (todaySarray.length < 5) return -1;
  const currentTime = moment().format('HH:mm');
  const currentTimeValue = +currentTime.replace(':', '');
  const ishaTimeValue = +todaySarray[5].replace(':', '');
  if (currentTimeValue >= ishaTimeValue) return -1;

  for (let i = 0; i < todaySarray.length; i++) {
    const prayerTimeValue = +todaySarray[i].replace(':', '');
    if (currentTimeValue <= prayerTimeValue) return i;
  }
}
