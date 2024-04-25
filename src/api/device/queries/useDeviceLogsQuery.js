import { Alert } from "react-native";
import { useQuery } from "react-query";
import GetCharacteristics from "../../../helpers/bluetooth/GetCharacteristics";
import GetDataLogs from "../../../helpers/bluetooth/GetDataLogs";
import LogsToSessions from "../../../helpers/sessions/LogsToSessions";

const GetDeviceLogs = ({ device }) => {
  return new Promise(async (resolve, reject) => {
    const timer = setTimeout(() => {
      reject(Error("TIMEOUT: Please make sure you have stable internet connection and are close to device. If issue persists, please contact us."));
    }, 30000);

    const characteristics = await GetCharacteristics(device);
    const logs = await GetDataLogs(characteristics);
    const data = LogsToSessions(logs);

    clearTimeout(timer);
    resolve(data);
  });
};

const KEY = "DEVICE_LOGS";
const useDeviceLogsQuery = (
  device,
  setDevice,
  cloudSessions,
  userId,
  uploadSessions
) => {
  return useQuery(KEY, () => GetDeviceLogs({ device }), {
    retry: false,
    enabled: !!device && !!cloudSessions && !!userId,
    staleTime: 0,
    cacheTime: 0,
    onError: async (data) => {
      Alert.alert("Something went wrong", data?.message);
      setDevice(null);
    },
    onSuccess: (data) => {
      uploadSessions({ deviceSessions: data, cloudSessions, userId });
    },
    onSettled: () => {
      device.cancelConnection();
    },
  });
};

export default useDeviceLogsQuery;
