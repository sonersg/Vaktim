import moment from "moment";
import { IPrayerTimesObject } from "../../src/types/sampleObjectType";
import { MMKVstorage } from "../../src/screens/CitiesListScreen";

type getTimesType = {
  time: number;
  timeLeft: string;
};

function getTimes(
  parsedPrayerTimesObject: IPrayerTimesObject | undefined
): getTimesType {
  const ishaMessage = MMKVstorage.getString("isha-message") || "--";

  if (parsedPrayerTimesObject) {
    const date = new Date();
    const todayAsISOString = date.toISOString().slice(0, 10);
    const currentTimeValue = moment().format("HH:mm");
    const todaySarray = parsedPrayerTimesObject.times[todayAsISOString] || [];

    if (currentTimeValue >= todaySarray[5]) {
      return { time: -1, timeLeft: ishaMessage };
    }

    for (let i = 0; i < todaySarray.length; i++) {
      const prayerTime = todaySarray[i];
      if (currentTimeValue <= prayerTime) {
        const [currentHours, currentMinutes] = currentTimeValue.split(":");
        const [prayerHours, prayerMinutes] = prayerTime.split(":");

        const totalMinutes1 = +currentHours * 60 + +currentMinutes;
        const totalMinutes2 = +prayerHours * 60 + +prayerMinutes;

        const minutesDifference = totalMinutes2 - totalMinutes1;

        const hoursLeft = Math.floor(minutesDifference / 60);
        const minutesLeft = minutesDifference % 60;

        return { time: i, timeLeft: `${hoursLeft}:${minutesLeft}` };
      }
    }
  }
  return { time: -1, timeLeft: "error" };
}

export default getTimes;
