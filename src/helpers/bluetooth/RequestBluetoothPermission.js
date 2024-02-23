import { PermissionsAndroid, Platform } from 'react-native';

export const requestBluetoothPermission = async () => {
  if (Platform.OS === 'ios') {
    // iOS-specific logic
    return true;
  } else if (Platform.OS === 'android') {
    // Android-specific permission request logic
    const result = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      //PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    ]);

    return result[PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT] === PermissionsAndroid.RESULTS.GRANTED &&
           result[PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN] === PermissionsAndroid.RESULTS.GRANTED &&
           result[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] === PermissionsAndroid.RESULTS.GRANTED;
           //&& result[PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS] === PermissionsAndroid.RESULTS.GRANTED;
  }
  return false;
};