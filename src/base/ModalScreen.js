import React from "react";
import { View } from "react-native";
import { tw } from "tailwind";
import { useNavigation } from "@react-navigation/core";

const ModalScreen = ({ children }) => {
  return (
    <View style={tw("flex-1")}>
      <View style={tw("flex-1 bg-white")}>{children}</View>
    </View>
  );
};

export default ModalScreen;
