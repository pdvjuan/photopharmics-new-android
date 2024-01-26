import React from "react";
import { View} from "react-native";
import { tw } from "tailwind";
import Header from "./Header";

const PageContainer = ({ children, noHeader = false }) => {
  return (
    <View style={tw("flex-1")}>
      {!noHeader && <Header />}
      <View style={tw("flex-1")}>{children}</View>
    </View>
  );
};

export default PageContainer;

