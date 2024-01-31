import * as Notifications from "expo-notifications";

// TODO: Replace
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

async function setupNotificationChannel() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('daily-reminder', {
      name: 'Daily Reminders',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
}


async function schedulePushNotification(hour, minute) {

  await setupNotificationChannel();

  // TODO: Replace
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Celeste Session Reminder",
      body: "This is your daily reminder to complete your daily session.",
      data: { screen: "  "},
    },
    trigger: {
      hour: hour,
      minute: minute,
      repeats: true,
    },
  });
}

export default schedulePushNotification;
