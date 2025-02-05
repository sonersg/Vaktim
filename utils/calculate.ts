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

export function name(lat: number, long: number) {
  let obj = {};
  for (let i = 0; i < 33; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const iso = date.toISOString().slice(0, 10);
    const times = prayTimes.getTimes(date, [lat, long], timeZone);

    obj = {
      ...obj,
      [iso]: times,
    };
  }

  console.log(obj);
  return obj;
}

const lat = 37.066;
const long = 37.3781;
// console.log(name(lat, long));
