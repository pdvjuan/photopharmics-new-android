import React from "react";
import { View, Text } from "react-native";
import { tw, getColor } from "tailwind";

const DataRow1 = ({ Icon, name, value }) => {
  return (
    <View
      style={tw(
        "flex flex-row justify-between items-center  py-2"
      )}
    >
      <View style={tw("flex flex-row items-center")}>
        <Icon color={getColor("gray-500")} size={20} />
        <Text style={tw("text-gray-500 text-lg mx-2")}>{name}</Text>
      </View>
      <View>
        <Text style={tw("text-celeste-blue text-lg")}>{value}</Text>
      </View>
    </View>
  );
};

export default DataRow1;
