import React, { useState ,useEffect} from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { Button } from "../../base";
import PageContainer from "../PageContainer";
import { ActivityIndicator } from "react-native";
import { BleManager } from "react-native-ble-plx";
import { tw } from "../../../tailwind";
import useScanBLEDevicesQuery from "../../api/device/queries/useScanBLEDevicesQuery";
import BluetoothRequiredScreen from "../BluetoothRequiredScreen";
import BluetoothSyncScreen from "./BluetoothSyncScreen";
import IdentifyMyDeviceScreen from "./IdentifyMyDeviceScreen";
import useSavedDeviceQuery from "../../api/device/queries/useSavedDeviceQuery";
import useSaveDeviceMutation from "../../api/device/mutations/useSaveDeviceMutation";
import { useAppContext } from "../../context/AppContext";
import {requestBluetoothPermission} from "../../helpers/bluetooth/RequestBluetoothPermission";

const MANAGER = new BleManager();
const SCAN_DURATION = 5000;
const SEARCH_NAME = "Celeste";

const BluetoothScanScreen = ({ navigation: { navigate } }) => {
  const [device, setDevice] = useState(null);
  const [modal, setModal] = useState(false);
  const { state } = useAppContext();
  const { user } = state;
  const [givenName, setGivenName] = useState(user.given_name);

  const {
    data: devices,
    isLoading: isLoadingDevices,
    isFetching,
    isError,
    error,
    refetch,
  } = useScanBLEDevicesQuery(MANAGER, SCAN_DURATION, SEARCH_NAME);
  


  const { data: savedDeviceId, isLoading: isLoadingSavedDevice } =
    useSavedDeviceQuery();
  const { mutate: saveDeviceToStorage } = useSaveDeviceMutation();
  const isLoading = isLoadingDevices || isLoadingSavedDevice;

  const onPress = (ble) => {
    saveDeviceToStorage({ deviceName: ble.localName });
    setDevice(ble);
  };

  useEffect(() => {
    // Directly call the imported function
    const checkPermissions = async () => {
      const hasPermission = await requestBluetoothPermission();
      if (!hasPermission) {
        
      }
    };

    checkPermissions();

  }, []);

  useEffect(() => {
    // Check if devices are loaded and the list is not empty
    if (devices && devices.length > 0 && !device) {
      // Automatically select the first device from the list
      setDevice(devices[0].ble);

      // Optionally, save the device or perform other actions here
      saveDeviceToStorage({ deviceName: devices[0].ble.localName });
    }
  }, [devices, device, saveDeviceToStorage]);

  if (isError)
    return <BluetoothRequiredScreen error={error?.message} refetch={refetch} />;
  if (device)
    return <BluetoothSyncScreen device={device} setDevice={setDevice} />;
  if (devices && !isLoading && savedDeviceId) {
    devices.forEach((device) => {
      if (device.name === savedDeviceId) {
        setDevice(device.ble);
      }
    });
  }

  return (

    <PageContainer>

      <View style={tw("flex-1 pt-10")}>
        <Text style={tw("font-nunito-700 text-2xl text-center mb-0.5")}>
          {devices?.length > 0
            ? `Celeste device${devices?.length > 1 ? "s" : ""} detected`
            : isLoading || isFetching
            // ? `Searching for ${
            //     savedDeviceId ? savedDeviceId : "Celeste device"
            //   }`
            ? "Searching for Celeste device"
            : "No Celeste device found"}
        </Text>
        {devices?.length > 0 && !isFetching && (
          <View style={tw("items-center px-10")}>
            <Text
              style={tw(
                "font-nunito-400 text-base text-center pt-1 text-celeste-darkgray"
              )}
            >
              Please select a Celeste device from the screen below. Not seeing
              your device listed?
            </Text>
            <Button
              title="Search Again"
              onPress={refetch}
              style={tw("my-4")}
              textStyle={tw("text-white")}
            />
          </View>
        )}
        {isLoading || isFetching ? (
          <View style={tw("flex-1 items-center px-10")}>
            <Text
              style={tw("font-nunito-400 text-base text-center py-1 mb-10")}
            >
              The Celeste mobile application will now attempt to connect with your 
              Celeste device. Your device must be plugged in (the green button on 
              your device will be lit). Bring your mobile phone within a few feet 
              of the device.
            </Text>
            <ActivityIndicator size="large" color="black" />
          </View>
        ) : devices.length < 1 ? (
          <View style={tw("items-center px-8")}>
            <Text
              style={tw(
                "font-nunito-400 text-center text-base mb-10 py-1 text-celeste-darkgray"
              )}
            >
              Check to confirm your device is plugged in (the green button on your device 
              will be lit). If plugged in, try disconnecting the device from power for 10 
              seconds before trying again. Also, bring your mobile phone within a few feet 
              of the device.
            </Text>
            
            <Button
              title="Search Again"
              onPress={refetch}
              style={tw("my-4")}
              textStyle={tw("text-white")}
            />
            
          </View>
        ) : (
          <View>
            <FlatList
              data={devices}
              keyExtractor={(device) => device.name}
              style={tw("my-2")}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={tw("border-t border-b border-celeste-lightgray py-4")}
                  onPress={() => onPress(item.ble)}
                >
                  <Text style={tw("font-nunito-400 px-4")}>
                    {item.name == savedDeviceId
                      ? item.name + " (Previous Device)"
                      : item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              onPress={() => setModal(true)}
              style={tw("my-12 items-center")}
            >
              <Text style={tw("text-lg text-celeste-blue font-nunito-400")}>
                How do I identify my device?
              </Text>
            </TouchableOpacity>
            <IdentifyMyDeviceScreen
              modalVisible={modal}
              setModalVisible={setModal}
            />
          </View>
        )}
      </View>

    </PageContainer>
  );
};

export default BluetoothScanScreen;
