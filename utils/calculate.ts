import { storage } from '../app/(screens)/_layout';
import PrayTimes from '../assets/prayTimes';

const prayTimes = PrayTimes('MWL');

// Adjust calculation parameters (if needed)
prayTimes.adjust({
  fajr: 18,
  isha: 17,
});

// Add an offset to the sunrise time (e.g., +10 minutes)
prayTimes.tune({
  sunrise: -7,
  dhuhr: 5, // Add 5 minutes to dhuhr
  asr: 4,
  maghrib: 6,
});

const timeZone = 3;

export default function calculateArray(size: number) {
  const lat = storage.getNumber('lat') || 37.066;
  const long = storage.getNumber('long') || 37.3781;

  if (lat === 37.066 && long === 37.3781) {
    storage.set('selected-city', 'Gaziantep');
  }

  const arr = new Array(size); // Pre-allocate

  for (let i = 0; i < size; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    // const iso = date.toISOString().slice(0, 10);
    const times = prayTimes.getTimes(date, [lat, long], timeZone);
    const valuesArray = Object.values(times);
    valuesArray.splice(8, 1); // remove midnight
    valuesArray.splice(5, 1); // remove sunset
    valuesArray.splice(0, 1); // remove imsak
    arr[i] = valuesArray;
    // arr.push(times);
  }

  return arr;
}

// const lat = 37.066;
// const long = 37.3781;
// console.log(name(lat, long));
