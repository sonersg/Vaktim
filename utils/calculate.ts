import { storage } from '../app/(screens)/_layout';
import PrayTimes from '../assets/prayTimes';

const timeZone = new Date().getTimezoneOffset() / -60;

export default function calculateArray(size: number, start: number = 0) {
  console.log('Calculate function called', size, start);

  let prayTimes = new PrayTimes('Turkiye');

  // Set calculation method from localStorage
  const cm = storage.getString('calculation-method');
  if (cm && cm != 'Custom') prayTimes = new PrayTimes(cm);

  // Adjust calculation angles
  const fa = storage.getString('fajr-angle');
  const ia = storage.getString('isha-angle');
  if (fa && ia) {
    prayTimes.adjust({
      fajr: +fa,
      isha: +ia,
    });
  }

  // Adjust tunes
  const to = storage.getString('tunes-object');

  if ((cm === 'Turkiye' || !cm) && !to) {
    prayTimes.tune({
      sunrise: -7,
      dhuhr: 5,
      asr: 4,
      maghrib: 6,
    });
  }

  if (to) {
    const parsedTunes = JSON.parse(to);
    // Adjust offsets as number and minutes type
    if (cm === 'Turkiye' || !cm) {
      prayTimes.tune({
        fajr: +parsedTunes.fajr,
        sunrise: +parsedTunes.sunrise - 7,
        dhuhr: +parsedTunes.dhuhr + 5,
        asr: +parsedTunes.asr + 4,
        maghrib: +parsedTunes.maghrib + 6,
        isha: +parsedTunes.isha,
      });
    } else {
      prayTimes.tune({
        fajr: +parsedTunes.fajr,
        sunrise: +parsedTunes.sunrise,
        dhuhr: +parsedTunes.dhuhr,
        asr: +parsedTunes.asr,
        maghrib: +parsedTunes.maghrib,
        isha: +parsedTunes.isha,
      });
    }
  }

  const lat = storage.getNumber('lat') || 37.066;
  const lon = storage.getNumber('lon') || 37.3781;
  // const lat = 37.066;
  // const lon = 37.3781;

  const arr = new Array(size); // Pre-allocate

  for (let i = 0; i < size; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i + start);
    // const iso = date.toISOString().slice(0, 10);
    const times = prayTimes.getTimes(date, [lat, lon], timeZone);
    const valuesArray = Object.values(times);
    valuesArray.splice(8, 1); // remove midnight
    valuesArray.splice(5, 1); // remove sunset
    valuesArray.splice(0, 1); // remove imsak
    arr[i] = valuesArray;
    // arr.push(times);
  }

  return arr;
}
