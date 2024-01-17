import { useQuery } from "react-query";
import { useAppContext } from "../../../context/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const GetSavedDevices = async (dispatch) => {
  const savedDevice = await AsyncStorage.getItem("SAVED_DEVICE");
  if (savedDevice !== null) {
    return savedDevice;
  } else {
    return "";
  }
};

const useSavedDeviceQuery = () => {
  const { dispatch } = useAppContext();
  return useQuery("SAVED_DEVICE", () => GetSavedDevices(dispatch), {
    staleTime: 0,
  });
};

export default useSavedDeviceQuery;
