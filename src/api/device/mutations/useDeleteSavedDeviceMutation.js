import { useMutation } from "react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient } from "react-query";
import { Alert } from "react-native";

const DeleteSavedDevice = async ({ deviceName }) => {
  await AsyncStorage.removeItem("SAVED_DEVICE");
  return deviceName;
};

const useDeleteSavedDeviceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(DeleteSavedDevice, {
    onSuccess: (deviceName) => {
      queryClient.invalidateQueries("SAVED_DEVICE");
      Alert.alert(
        "Deleted Saved Device",
        "Device " + deviceName + " removed succesfully"
      );
    },
    onError: (error) => {
      console.log("Error saving device");
      console.log(error);
    },
  });
};

export default useDeleteSavedDeviceMutation;
