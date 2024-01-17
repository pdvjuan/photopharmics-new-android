import React from "react";
import PulsingDiv from "./PulsingDiv";
import { View, Text } from "react-native";
import { tw } from "tailwind";

const HomeDashboardLoading = () => {
  return (
    <View style={tw("bg-white flex-row")}>
      <View
        style={tw(
          "border-r border-celeste-lightgray w-1/3 justify-center items-center"
        )}
      >
        <PulsingDiv classes="bg-gray-200 h-32 my-4 w-3/4 rounded" />
      </View>
      <View
        style={tw(
          "border-r border-celeste-lightgray flex-1 items-center justify-center"
        )}
      >
        <PulsingDiv classes="bg-gray-200 w-5/6 h-6 my-2 rounded" />
        <PulsingDiv classes="bg-gray-200 w-5/6 h-6 my-2 rounded" />
        <PulsingDiv classes="bg-gray-200 w-5/6 h-6 my-2 rounded" />
      </View>
    </View>
  );
};

export default HomeDashboardLoading;
