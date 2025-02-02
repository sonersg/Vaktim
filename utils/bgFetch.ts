// import * as BackgroundFetch from 'expo-background-fetch';
// import * as TaskManager from 'expo-task-manager';
// import { schedulePushNotification } from './notifications';

// const TASK_NAME = 'my-daily-update';

// // 1. Define the Task
// TaskManager.defineTask(TASK_NAME, async () => {
//   //   const now = new Date();
//   //   const currentHour = now.getHours();

//   //   if (currentHour === 0) {
//   // Check if it is 12 AM
//   console.log('It is 12 AM! Running daily update.');
//   // Perform your update logic here (e.g., API call, database update)
//   await updateMyData();
//   return BackgroundFetch.BackgroundFetchResult.NewData;
//   //   } else {
//   //     console.log('Not 12AM, do nothing.');
//   //     return BackgroundFetch.BackgroundFetchResult.NoData;
//   //   }
// });

// // 2. Register the Task (Call this during app initialization)
// export async function registerBackgroundTask() {
//   try {
//     await BackgroundFetch.registerTaskAsync(TASK_NAME, {
//       minimumInterval: 6, // mins minimum to check for 12am
//       stopOnTerminate: false, // Keep running even if the app is terminated
//       startOnBoot: true, // Start the task on device boot
//     });
//     console.log('Background task registered');
//   } catch (error) {
//     console.error('Failed to register background task:', error);
//   }
// }

// // Helper update logic function
// async function updateMyData() {
//   //Your code to update data
//   await schedulePushNotification();
//   console.log('Updating Data');
//   return Promise.resolve();
// }

// // 3. Check if Task is Registered
// export async function checkBackgroundTaskStatus() {
//   const status = await BackgroundFetch.getStatusAsync();
//   console.log('Background status: ', status);
//   const tasks = await TaskManager.getRegisteredTasksAsync();
//   console.log('registered tasks: ', tasks);
// }
