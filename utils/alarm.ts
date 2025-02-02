// import { removeAlarm, scheduleAlarm, stopAlarm } from 'expo-alarm-module';

// export const alarmIn60 = () => {
//   var newDate = new Date();
//   newDate.setSeconds(newDate.getSeconds() + 20);

//   scheduleAlarm({
//     uid: 'alarm1',
//     day: newDate,
//     title: 'Title of alarm',
//     description: 'Alarm Description',
//     snoozeInterval: 5,
//     repeating: true,
//     active: true,
//   } as any);
// };

// /* Create a new alarm 60 seconds after the current date.*/
// export const onStopAlarmButton = () => {
//   // Stops any alarm that is playing
//   stopAlarm();

//   // Removes the alarm. Also stops any alarm that is playing, so the above function stopAlarm is redundant.
//   removeAlarm('alarm1');
// };
