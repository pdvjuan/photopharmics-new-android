import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { tw, getColor } from "tailwind";
import { MenuIcon, RefreshIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/core";

const Header = () => {
  const { openDrawer, navigate } = useNavigation();

  return (
    <View
      style={[
        tw(
          "pt-12 pb-2 bg-white flex-row justify-center items-center bg-celeste-blue"
        ),
        {
          shadowColor: getColor("gray-500"),
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.4,
          shadowRadius: 3,
          elevation: 10,
        },
      ]}
    >
      <TouchableOpacity style={tw("px-5")} onPress={openDrawer}>
        <MenuIcon size={30} color="white" style={tw("px-4")} />
      </TouchableOpacity>
      <Text
        style={tw("font-nunito-900 flex-1 text-3xl text-center text-white")}
      >
        Celeste
      </Text>
      <TouchableOpacity
        style={tw("px-5")}
        onPress={() => navigate("BluetoothScan")}
      >
        <RefreshIcon size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
