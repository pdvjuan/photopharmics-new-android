import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { useQuery } from "react-query";
import { AmplifyUpdateUser } from "../../cognito/mutations/useUpdateUserMutation";
import { GetCurrentUser } from "../../cognito/queries/useCurrentUserQuery";
import { useAppContext } from "../../../context/AppContext";
import schedulePushNotification from "../../../helpers/device/ScheduleNotification";


// TODO: Replace
const GetNotificationPermission = async (expo_token, dispatch) => {
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      if (finalStatus === "denied" && expo_token) {
        await AmplifyUpdateUser({ "custom:expo_token": "" });
        await GetCurrentUser(dispatch);
        await Notifications.cancelAllScheduledNotificationsAsync();
      }
      return;
    }
    // WATCH: THE EXPERIENCE ID SHOULD BE AUTOMATED SOON. https://forums.expo.io/t/runtime-error-no-experienceid-found/54708/2
    const token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: "@axialabs/celeste",
      })
    ).data;
    console.info("NEW TOKEN:", token); // DEBUG_VAL: THIS VALUE CAN BE USED HERE https://expo.dev/notifications
    if (expo_token !== token) {
      await AmplifyUpdateUser({ "custom:expo_token": token });
      await GetCurrentUser(dispatch);
      await Notifications.cancelAllScheduledNotificationsAsync();
      await schedulePushNotification(20, 0);
    }
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
};

export const KEY = "CELESTE_NOTIFICATION_PREFERENCES";
// TODO: Replace
const useNotificationsPermissionQuery = () => {
  const { state, dispatch } = useAppContext();
  const expo_token = state?.user?.["custom:expo_token"];
  return useQuery(KEY, () => GetNotificationPermission(expo_token, dispatch), {
    staleTime: Infinity,
  });
};

export default useNotificationsPermissionQuery;
