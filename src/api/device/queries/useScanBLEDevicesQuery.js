import { useQuery } from "react-query";

const StartBluetoothScan = ({ manager, duration, search }) => {
  return new Promise(async (resolve, reject) => {
    let devices = {};
    console.log("in scan");
    setTimeout(() => {
      manager.stopDeviceScan();
      let _devices = [];
      Object.keys(devices).forEach((key) => {
        _devices.push({ name: key, ble: devices[key] });
      });
      resolve(_devices);
    }, duration);

    manager.startDeviceScan(null, null, (error, device) => {
      if (error) reject(error);
      if (device?.localName) {
        if (device?.localName.includes(search)) {
          if (!devices[device.localName]) {
            console.log("found devices");
            devices[device.localName] = device;
          }
        }
      }
    });
  });
};

export const KEY = "SCAN_DEVICES";
const useScanBLEDevicesQuery = (manager, duration, search) => {
  return useQuery(
    KEY,
    () => StartBluetoothScan({ manager, duration, search }),
    {
      staleTime: 0,
      cacheTime: 0,
      retry: 1,
    }
  );
};

export default useScanBLEDevicesQuery;

// TODO: DELETE THIS WHEN BLE IS WORKING
// onSuccess: (devices, variables) => {
//   Alert.alert(
//     "Celeste Devices Found",
//     "Please select which device to connect to",
//     [
//       ...devices.map((device) => {
//         return {
//           text: device.name,
//           onPress: () =>
//             variables.ConnectDevice({
//               manager: variables.manager,
//               device: device.ble,
//             }),
//         };
//       }),
//       {
//         text: "Cancel",
//         style: "destructive",
//       },
//     ],
//     {
//       cancelable: true,
//     }
//   );
// },
// onError: ({ message }) => {
//   Alert.alert(
//     "Celeste Not Found",
//     "Please try restarting your celeste device and make sure you are within 3 feet of the device"
//   );
// },
