import React from "react";
import { View } from "react-native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

//SUPPORTER SCREENS
import SupportersListScreen from "./supporters/SupportersListScreen";
import AddSupporterScreen from "./supporters/AddSupporterScreen";
import EditSupporterScreen from "./supporters/EditSupporterScreen";

const SupporterStack = createStackNavigator();

const SupportersScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <SupporterStack.Navigator
        mode="modal"
        headerMode="none"
        screenOptions={{
          cardStyle: {
            backgroundColor: "transparent",
          },
          cardOverlayEnabled: true,
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
        }}
      >
        <SupporterStack.Screen
          name="Supporters List"
          component={SupportersListScreen}
        />
        <SupporterStack.Screen
          name="Add Supporter"
          component={AddSupporterScreen}
          style={{ backgroundColor: "transparent" }}
        />
        <SupporterStack.Screen
          name="EditSupporter"
          component={EditSupporterScreen}
          style={{ backgroundColor: "transparent" }}
        />
      </SupporterStack.Navigator>
    </View>
  );
};

export default SupportersScreen;
