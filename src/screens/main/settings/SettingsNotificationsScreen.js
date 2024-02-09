import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  AppState,
  Alert,
  Platform,
} from "react-native";
import { Button } from "../../../base";
import { tw } from "tailwind";
import PageContainer from "../../PageContainer";
import { useAppContext } from "../../../context/AppContext";
import OpenAppSettings from "../../../helpers/device/OpenAppSettings";
import useNotificationsPermissionQuery from "../../../api/device/queries/useNotificationsPermissionQuery";
import { AccordionListItem } from "../../../base";
import useUpdateUserMutation from "../../../api/cognito/mutations/useUpdateUserMutation";
import * as Notifications from "expo-notifications";
import schedulePushNotification from "../../../helpers/device/ScheduleNotification";
import DateTimePicker from "@react-native-community/datetimepicker";

const SettingsNotificationsScreen = () => {
  //useNotificationsPermissionQuery();

  const appState = useRef(AppState.currentState);
  const { state } = useAppContext();
  const expo_token = state?.user?.["custom:expo_token"];
  const email_pref = state?.user?.["custom:email_pref"];
  const text_pref = state?.user?.["custom:text_pref"];
  const { refetch } = useNotificationsPermissionQuery();
  const { mutate: updateUser, isLoading } = useUpdateUserMutation();
  const [time, setTime] = useState(new Date());
  console.log("init time, ", time);
  const [show, setShow] = useState(false);

  const onChange = (event, selectedTime) => {
    console.log("in OnChange, stime ", selectedTime);
    console.log("in OnChange, time ", time);
    const currentTime = selectedTime || time;
    console.log("in OnChange, scurrtime ", currentTime);
    setShow(Platform.OS === "ios");
    setTime(currentTime);
  };

  const showTimepicker = () => {
    setShow(true);
  };

  useEffect(() => {
    // TODO: Replace
    let tempTime = new Date();
    Notifications.getAllScheduledNotificationsAsync().then((data) => {
      const notificationHour =
        Platform.OS === "ios"
          ? data[0]?.trigger?.dateComponents?.hour
          : data[0]?.trigger?.hour;
      const notificationMinute =
        Platform.OS === "ios"
          ? data[0]?.trigger?.dateComponents?.minute
          : data[0]?.trigger?.minute;

      if (data?.length > 0) {
        tempTime.setHours(notificationHour);
        tempTime.setMinutes(notificationMinute);
        setTime(tempTime);
      } else if (expo_token) {
        Notifications.cancelAllScheduledNotificationsAsync();
        schedulePushNotification(18, 30);
        tempTime.setHours(18);
        tempTime.setMinutes(30);
        setTime(tempTime);
      }
    });
    AppState.addEventListener("change", _handleAppStateChange);
    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      setTimeout(() => {
         refetch();
      }, 200);
    }
    appState.current = nextAppState;
  };

  const handleUpdate = (attr, val) => {
    updateUser({
      [`custom:${attr}`]: val,
    });
  };

  return (
    <PageContainer noHeader>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <AccordionListItem
          //title={`Push Notifications Disabled`}
          title={`Push Notifications (${expo_token ? "Enabled" : "Disabled"})`}
        >
          <Text style={tw("font-nunito-400 text-base w-full")}>
            On-screen notifications are managed in Celeste mobile app settings.
          </Text>
          <Button
            title="Open App Settings"
            style={tw("my-2")}
            textStyle={tw("text-white")}
            onPress={OpenAppSettings}
          />
        </AccordionListItem>
        {/* <AccordionListItem
          title={`Email (${email_pref !== "false" ? "Enabled" : "Disabled"})`}
        >
          <Text style={tw("font-nunito-400 text-base w-full")}>
            Email Notifications will be sent to {state?.user?.email}
          </Text>
          <Button
            title={`${
              email_pref !== "false" ? "Disable" : "Enable"
            } Email Notifications`}
            style={tw("my-2")}
            textStyle={tw("text-white")}
            isLoading={isLoading}
            onPress={() =>
              handleUpdate(
                "email_pref",
                email_pref !== "false" ? "false" : "true"
              )
            }
          />
        </AccordionListItem> */}
        {/* <AccordionListItem
          title={`Text (${text_pref !== "false" ? "Enabled" : "Disabled"})`}
        >
          <Text style={tw("font-nunito-400 text-base w-full")}>
            Text Notifications will be sent to {state?.user?.phone_number}
          </Text>
          <Button
            title={`${
              text_pref !== "false" ? "Disable" : "Enable"
            } Text Notifications`}
            style={tw("my-2")}
            textStyle={tw("text-white")}
            isLoading={isLoading}
            onPress={() =>
              handleUpdate(
                "text_pref",
                text_pref !== "false" ? "false" : "true"
              )
            }
          />
        </AccordionListItem> */}
        <AccordionListItem title="Daily Reminder">
          <View style={tw("bg-white")}>
            {/* TODO: Replace */}
            {/* {expo_token ? ( */}
            {expo_token ? (
              <View>
                <View style={tw("flex-row")}>
                  {Platform.OS == "ios" ? (
                    <View style={tw("w-24 mt-1 mr-2")}>
                      <DateTimePicker
                        value={time}
                        mode="time"
                        is24Hour={false}
                        display="default"
                        onChange={onChange}
                        minuteInterval={5}
                      />
                    </View>
                  ) : (
                    <View style={tw("w-32 mt-1 mr-2")}>
                      <Button
                        onPress={showTimepicker}
                        title="Change Time"
                        textStyle={tw("text-white")}
                      />
                      {show && (
                        <DateTimePicker
                          value={time}
                          mode="time"
                          is24Hour={false}
                          display="default"
                          onChange={onChange}
                          minuteInterval={5}
                        />
                      )}
                    </View>
                  )}
                  <View style={tw("w-64")}>
                    <Text style={tw("font-nunito-400 text-base w-full")}>
                      Your daily reminder is set for{" "}
                      {
                        time.getHours() > 12
                        ? time.getHours() - 12
                        : time.getHours()}
                      :
                      {time.getMinutes() < 10
                        ? "0" + String(time.getMinutes())
                        : time.getMinutes()}
                      {time.getHours() > 12 ? "pm" : "am"} every day.
                    </Text>
                  </View>
                </View>
                <Button
                  title="Save Notification Time"
                  style={tw("my-2")}
                  textStyle={tw("text-white")}
                  isLoading={isLoading}
                  onPress={async () => {
                    // TODO: Replace
                    await Notifications.cancelAllScheduledNotificationsAsync();
                    await schedulePushNotification(
                      time.getHours(),
                      time.getMinutes()
                    );
                    Alert.alert(
                      "Updated",
                      `Your daily reminder is set for ${
                        time.getHours() > 12
                          ? time.getHours() - 12
                          : time.getHours()
                      }:${
                        time.getMinutes() < 10
                          ? "0" + String(time.getMinutes())
                          : time.getMinutes()
                      }${time.getHours() > 12 ? "pm" : "am"}`
                    );
                  }}
                />
              </View>
            ) : (
              <View>
                <Text style={tw("font-nunito-400 text-base")}>
                  Notifications Are Not Enabled
                </Text>
              </View>
            )}
          </View>
        </AccordionListItem>
      </ScrollView>
    </PageContainer>
  );
};

export default SettingsNotificationsScreen;
