import { useMutation } from "react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SaveDevice = async ({ deviceName }) => {
  await AsyncStorage.setItem("SAVED_DEVICE", deviceName);
  return deviceName;
};

const useSaveDeviceMutation = () => {
  return useMutation(SaveDevice, {
    onSuccess: (deviceName) => {
      console.log("Device " + deviceName + " saved succesfully");
    },
    onError: (error) => {
      console.log("Error saving device");
      console.log(error);
    },
  });
};

export default useSaveDeviceMutation;
