import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PageContainer from "../PageContainer";
//SETTINGS SCREENS
import SettingsInfoScreen from "./settings/SettingsInfoScreen";
import SettingsNotificationsScreen from "./settings/SettingsNotificationsScreen";
import SettingsDeviceScreen from "./settings/SettingsDeviceScreen";

const SettingsScreen = () => {
  const SettingsStack = createMaterialTopTabNavigator();
  return (
    <PageContainer>
      <SettingsStack.Navigator initialRouteName="Info">
        <SettingsStack.Screen name="Info" component={SettingsInfoScreen} />
        <SettingsStack.Screen
          name="Alerts"
          component={SettingsNotificationsScreen}
        />
        <SettingsStack.Screen name="Device" component={SettingsDeviceScreen} />
      </SettingsStack.Navigator>
    </PageContainer>
  );
};

export default SettingsScreen;
