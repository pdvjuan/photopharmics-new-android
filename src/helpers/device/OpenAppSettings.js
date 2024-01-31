import { Platform, Linking } from "react-native";
import * as IntentLauncher from "expo-intent-launcher";

const OpenAppSettings = async () => {
  try {
    if (Platform.OS === "ios") {
      await Linking.openURL("app-settings:");
    } else {
      const packageName = "com.photopharmics.celestemobile";
      const uri = `package:${packageName}`;
      await IntentLauncher.startActivityAsync(IntentLauncher.ActivityAction.APPLICATION_DETAILS_SETTINGS, {
        data: uri,
      });
    }
  } catch (error) {
    console.error("Failed to open app settings:", error);
  }
};

export default OpenAppSettings;





// import { Platform, Linking } from "react-native";
// import * as IntentLauncher from "expo-intent-launcher";

// const OpenAppSettings = () => {
//   if (Platform.OS === "ios") {
//     Linking.openURL("app-settings:");
//   } else {
//     // TODO: Replace
//     IntentLauncher.startActivityAsync(
//       IntentLauncher.ACTION_APPLICATION_DETAILS_SETTINGS,
//       {
//         data: "package:com.photopharmics.celestemobile",
//       }
//     );
//   }
// };

// export default OpenAppSettings;
