// import BackgroundService from "react-native-background-actions";
// import * as Notifications from "expo-notifications";

// // Utility function to simulate a delay
// const sleep = (time: number): Promise<void> =>
//   new Promise((resolve) => setTimeout(resolve, time));

// interface TaskParams {
//   delay: number;
// }

// // Define the background task function
// const veryIntensiveTask = async (
//   taskDataArguments?: TaskParams
// ): Promise<void> => {
//   const delay = taskDataArguments?.delay ?? 5000; // Default delay of 1000ms if undefined

//   await new Promise(async (resolve) => {
//     for (let i = 0; BackgroundService.isRunning(); i++) {
//       console.log(`Running background task iteration: ${i}`);

//       const trigger = new Date(Date.now() + 3 * 1000);
//       try {
//         await Notifications.scheduleNotificationAsync({
//           content: {
//             title: "notificationContent[i].title",
//             body: "notificationContent[i].body",
//           },
//           trigger,
//         });
//         // console.log(`Notification ${i + 1} scheduled for:`, trigger);
//         console.log(`Notification ${i + 1} scheduled for:`);

//         //Small delay to prevent rate limiting issues
//         // await new Promise((resolve) => setTimeout(resolve, 300));
//       } catch (error) {
//         console.error(`Failed to schedule notification ${i + 1}:`, error);
//       }

//       await sleep(delay);
//     }
//   });
// };
// const myBackgroundTask = async (taskData?: { interval: number }) => {
//   const interval = taskData?.interval ?? 5000; // Default interval if not provided

//   await new Promise(async (resolve) => {
//     while (BackgroundService.isRunning()) {
//       console.log("Running background task...");
//       // Perform your task (e.g., API call, data processing, etc.)
//       await sleep(interval);
//     }
//   });
// };

// // Task options configuration
// const options = {
//   taskName: "HiddenTask",
//   taskTitle: "Running Background Task",
//   taskDesc: "Executing background operations",
//   taskIcon: {
//     name: "ic_launcher", // Icon name in res/mipmap folder
//     type: "mipmap", // Icon type
//   },
//   color: "#ff00ff", // Notification color
//   linkingURI: "myapp://home", // Deep link when notification is clicked
//   parameters: {
//     delay: 9000, // Delay for the task loop in milliseconds
//   },
// };
// const optionss = {
//   taskName: "HiddenTask",
//   taskTitle: "",
//   taskDesc: "",
//   taskIcon: {
//     name: "ic_launcher", // Use a transparent icon in your res/mipmap folder
//     type: "mipmap",
//   },
//   color: "#000000", // Black notification (or same as status bar color)
//   linkingURI: "", // No deep linking
//   parameters: {
//     delay: 3000,
//   },
// };

// export const startBackgroundTask = async () => {
//   try {
//     console.log("Starting background task...");
//     await BackgroundService.start<TaskParams>(veryIntensiveTask, options);
//     console.log("Background task started");
//   } catch (error) {
//     console.error("Failed to start background task:", error);
//   }
// };

// export const stopBackgroundTask = async () => {
//   try {
//     console.log("Stopping background task...");
//     await BackgroundService.stop();
//     console.log("Background task stopped");
//   } catch (error) {
//     console.error("Failed to stop background task:", error);
//   }
// };

// // Updating the background notification (Android only)
// const updateNotification = async () => {
//   await BackgroundService.updateNotification({
//     taskDesc: "Updated task description",
//   });
// };
