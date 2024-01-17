import React from "react";
import { View } from "react-native";
import { tw } from "tailwind";
import Header from "./Header";

const PageContainer = ({ children, noHeader = false }) => {
  return (
    // TODO: Replace
    // This <View> directly below used to be a LinearGradient before removing Expo
    <View
      // colors={["#FFFFFF", "#DFECFF"]}
      // locations={["0", ".5"]}
      style={tw("flex-1")}
    >
      {!noHeader && <Header />}
      <View style={tw("flex-1")}>{children}</View>
    </View>
  );
};

export default PageContainer;
