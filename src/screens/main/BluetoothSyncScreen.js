import React, { useEffect} from "react";
import { useNavigation } from "@react-navigation/core";
import { navigate} from "../../helpers/navgationRef";
import { CommonActions } from '@react-navigation/native';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { MinusCircleIcon, XCircleIcon } from "react-native-heroicons/outline";
import { CheckCircleIcon } from "react-native-heroicons/solid";
import { tw, getColor } from "../../../tailwind";
import { useAppContext } from "../../context/AppContext";
import useDeviceLogsQuery from "../../api/device/queries/useDeviceLogsQuery";
import useSessionsQuery from "../../api/celeste/queries/useSessionsQuery";
import { Button } from "../../base";
import PageContainer from "../PageContainer";
import useUploadSessionsMutation from "../../api/celeste/mutations/useUploadSessionsMutation";
import { isError } from "react-query";
import { data } from "autoprefixer";
import {scheduleReminders} from "../../helpers/device/ScheduleSyncNotifications";
import DeviceInfo from "react-native-device-info";


const BluetoothSyncScreen = ({ device, setDevice }) => {
  const { state } = useAppContext();
  const userId = state?.user?.sub;
  console.info("BluetoothScreen userID: " + userId);
  const { navigation } = useNavigation();
  let {
    data: cloudSessions,
    isLoading: gettingCloudSessions,
    isError: hasCloudLogError,
    isSuccess: gotCloudLogs,
  } = useSessionsQuery(state?.user?.sub);
  //console.info("Sessions Data: " + cloudSessions);
  let {
    mutate: uploadSessions,
    isLoading: isUploading,
    isError: hasUploadError,
    isSuccess: uploadedSessions,
  } = useUploadSessionsMutation();
  let {
    isLoading: isGettingLogs,
    isError: hasLogError,
    isSuccess: gotLogs,
  } = useDeviceLogsQuery(
    device,
    setDevice,
    cloudSessions,
    userId,
    uploadSessions
  );
  const anyError = hasCloudLogError || hasUploadError || hasLogError;

  

  const handleButton = () => {
    device = null;
    setDevice(null);
    console.log("curr duration: ",duration);
    if(duration < 60){
      scheduleReminders();
    }
    navigate("Home");
  };

  const getIcon = (isLoading, isError, isSuccess) => {
    const ICON_SIZE = 20;
    if (isError)
      return <XCircleIcon size={ICON_SIZE} color={getColor("red-500")} />;
    if (isLoading) return <ActivityIndicator size="small" color="black" />;
    if (isSuccess)
      return <CheckCircleIcon size={ICON_SIZE} color={getColor("green-500")} />;
    return <MinusCircleIcon size={ICON_SIZE} color={getColor("gray-200")} />;
  };

  let userTimeZone = null;

  if (Platform.OS === "android") {
    userTimeZone = DeviceInfo.timeZone;
  }
  else{
    userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

   // Create a Date object
   const userDate = new Date();

   // Options for formatting the date
   const options = {
     year: 'numeric',
     month: '2-digit',
     day: '2-digit',
     timeZone: userTimeZone,
   };

   // Use toLocaleString with the specified options
   const formattedDate = userDate.toLocaleString('en-US', options);

   const year = userDate.getFullYear();
   const month = String(userDate.getMonth() + 1).padStart(2, '0');
   const day = String(userDate.getDate()).padStart(2, '0');

   const todayDate = `${year}-${month}-${day}`;
  
   console.log("HOME: Todays Date: ",todayDate); // Outputs: YYYY-MM-DD

   // Filter the sessions to get the one with today's date
   const todaySession = cloudSessions.find(cloudSessions => cloudSessions.sessionDate === todayDate);
   
   let duration = 0;
   
   if(todaySession){
    duration = todaySession.duration;
   }
    
    console.log("Session in Sync: ", duration);

   const navigateToHome = () => {
     device = null;
     setDevice(null);
     if(duration < 60){
       scheduleReminders();
     }

     console.log("Going home");
     navigate("Home");
   };

  useEffect(() => {
    let timer;
    if (uploadedSessions || hasCloudLogError || hasLogError || hasUploadError) {
      timer = setTimeout(() => {
        navigateToHome(); 
      }, 3000); // 3 seconds delay
    }

    // Cleanup function to clear the timer if the component is unmounted or condition changes
    return () => clearTimeout(timer);
  }, [uploadedSessions, hasCloudLogError, hasLogError, hasUploadError, duration]);
    

    if (hasCloudLogError)
    return (
      <View style={tw("justify-center items-center")}>
        <Text>
          Cloud Error. Please try again. Please contactus if this problem persists.
        </Text>
      </View>
    );
    if (hasUploadError)
    return (
      <View style={tw("justify-center items-center")}>
        <Text>
          Upload Error. Please try again. Please contactus if this problem persists.
        </Text>
      </View>
    );
    if (hasLogError)
    return (
      <View style={tw("justify-center items-center")}>
        <Text>
          Log Error. Please try again. Please contactus if this problem persists.
        </Text>
      </View>
    );

  return (
    <PageContainer>
      <View style={tw("flex-1 pt-10 px-8 items-center")}>
        {gotCloudLogs && gotLogs && uploadedSessions ? (
          <Text style={tw("font-nunito-700 text-2xl text-center mb-0.5")}>
            Sync complete
          </Text>
        ) : (
          <Text style={tw("font-nunito-700 text-2xl text-center mb-0.5")}>
            Celeste sync status
          </Text>
        )}
        {gotCloudLogs && gotLogs && uploadedSessions ? (
          <Text
            style={tw(
              "font-nunito-400 text-base text-center pt-1 text-celeste-darkgray"
            )}
          >
            All sessions have been saved successfully.
          </Text>
        ) : (
          <Text
            style={tw(
              "font-nunito-400 text-base text-center pt-1 text-celeste-darkgray"
            )}
          >
            Please wait until upload is complete. DO NOT unplug your Celeste
            device.
          </Text>
        )}
        {gotCloudLogs && gotLogs && uploadedSessions ? (
          <View style={tw("items-center mt-12")}>
            <Image
              style={{ width: 250, height: 140 }}
              source={require("../../../assets/device-success.png")}
            />
          </View>
        ) : (
          <View style={tw("items-center mt-8")}>
            <ActivityIndicator size="large" color="black" />
            {/* <View style={tw("flex-row items-center py-4 px-4")}>
              {getIcon(gettingCloudSessions, hasCloudLogError, gotCloudLogs)}
              <Text
                style={tw(
                  "font-nunito-400 text-base text-center pt-1 text-celeste-darkgray"
                )}
              >
                {gotCloudLogs
                  ? "Cloud Sessions Downloaded"
                  : "Backing up previous sessions"}
              </Text>
            </View>
            <View
              style={
                isGettingLogs
                  ? tw("flex-row items-center py-4 px-4")
                  : tw("flex-row items-center py-4 px-8")
              }
            >
              {getIcon(isGettingLogs, hasLogError, gotLogs)}
              <Text
                style={tw(
                  "font-nunito-400 text-base text-center pt-1 text-celeste-darkgray"
                )}
              >
                {gotLogs ? "New sessions received" : "Getting new sessions"}
              </Text>
            </View>
            <View
              style={
                isGettingLogs
                  ? tw("flex-row items-center py-4 px-4")
                  : tw("flex-row items-center py-4 px-8")
              }
            >
              {getIcon(isUploading, hasUploadError, uploadedSessions)}
              <Text
                style={tw(
                  "font-nunito-400 text-base text-center pt-1 text-celeste-darkgray"
                )}
              >
                {uploadedSessions ? "Sessions Saved" : "Saving new sessions"}
              </Text>
            </View> */}
            <TouchableOpacity style={tw("my-14")}>
              <Text style={tw("text-base text-celeste-blue font-nunito-400")}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {(uploadedSessions ||
          hasCloudLogError ||
          hasLogError ||
          hasUploadError) && (
          <Button
            title="Go Home"
            style={tw("my-4")}
            textStyle={tw("text-white")}
            onPress={handleButton}
          />
        )}
      </View>
    </PageContainer>
  );
};

export default BluetoothSyncScreen;
