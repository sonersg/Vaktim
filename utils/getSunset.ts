// import moment from "moment";
// import getParsedPrayerTimes from "./getParsedPrayerTimes";
// import useToast from "./useToast";

// export default function getSunset() {
//     const date = new Date();
//     const todayAsISOString = date.toISOString().slice(0, 10);
//     const currentTimeValue = +moment().format("HH:mm").replace(/:/g, "");
//     const maghrib = getParsedPrayerTimes()?.times[todayAsISOString][4];
//     // ["06:11", "07:39", "12:41", "15:10", "17:33", "18:56"]

//     if (!maghrib) return;

//     if (currentTimeValue > +maghrib.replace(/:/g, "")) return;

//     const totalMinutes1 = date.getHours() * 60 + date.getMinutes();

//     const totalMinutes2 = +maghrib.split(":")[0] * 60 + +maghrib.split(":")[1];

//     // Calculate the time difference in minutes
//     const minutesDifference = totalMinutes2 - totalMinutes1;

//     const hoursLeft = Math.floor(minutesDifference / 60);

//     const minutesLeft = minutesDifference % 60;

//     const s =
//         hoursLeft === 0
//             ? `${minutesLeft} dakika`
//             : `${hoursLeft} saat ${minutesLeft} dakika`;

//     useToast(s);
// }
