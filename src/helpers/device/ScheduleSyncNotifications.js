import * as Notifications from 'expo-notifications';

// Set the notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Function to set up a notification channel for Android
async function setupNotificationChannel() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('sync-reminder', {
      name: 'Sync Reminders',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
}

async function scheduleOneTimePushNotification(delayInMinutes, title, body) {
  await setupNotificationChannel();
  const trigger = new Date(Date.now() + delayInMinutes * 60 * 1000); // Convert minutes to milliseconds

  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      data: { screen: "BluetoothScan"},
    },
    trigger,
  });
}

export async function scheduleReminders() {
  await scheduleOneTimePushNotification(45, "Celeste Session Reminder", "45 minutes have passed. Time to complete your daily session.");
  await scheduleOneTimePushNotification(60, "Celeste Session Reminder", "60 minutes have passed. Time to complete your daily session.");
}
