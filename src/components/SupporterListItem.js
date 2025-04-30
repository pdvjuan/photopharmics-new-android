import React from "react";
import { View, Text } from "react-native";
import { DotsVerticalIcon } from "react-native-heroicons/outline";
import { tw } from "../../tailwind";

const SupporterListItem = ({ supporter }) => {
  return (
    <View
      style={tw(
        "border-b border-gray-300 flex-row justify-between items-center h-24 bg-white"
      )}
    >
      <View>
        <Text style={tw("font-nunito-400 text-xl px-2")}>
          {supporter.firstName} {supporter.lastName}
        </Text>
        <Text style={tw("font-nunito-400 text-base px-2")}>
          {supporter.verified ? "Confirmed" : "Unconfirmed"}
        </Text>
      </View>
      <View style={tw("px-2")}>
        <DotsVerticalIcon color="#6B7280" size={32} />
      </View>
    </View>
  );
};

export default SupporterListItem;
