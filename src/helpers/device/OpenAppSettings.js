import { Platform, Linking } from "react-native";
// import * as IntentLauncher from "expo-intent-launcher";

const OpenAppSettings = () => {
  if (Platform.OS === "ios") {
    Linking.openURL("app-settings:");
  } else {
    // TODO: Replace
    // IntentLauncher.startActivityAsync(
    //   IntentLauncher.ACTION_APPLICATION_DETAILS_SETTINGS,
    //   {
    //     data: "package:com.photopharmics.celesteapp",
    //   }
    // );
  }
};

export default OpenAppSettings;
