import { Platform, Linking } from "react-native";
import * as IntentLauncher from "expo-intent-launcher";

const OpenBTSettings = async () => {
  try {
    if (Platform.OS === "ios") {
      await Linking.openSettings();
    } else {
      await IntentLauncher.startActivityAsync(IntentLauncher.ActivityAction.BLUETOOTH_SETTINGS);
    }
  } catch (error) {
    console.error("Failed to open app settings:", error);
  }
};

export default OpenBTSettings;


