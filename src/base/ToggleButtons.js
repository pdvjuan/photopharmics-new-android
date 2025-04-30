import React from "react";
import { tw } from "../../tailwind";
import { View, Text } from "react-native";
import Button from "./Button";

const ToggleButtons = ({
  value,
  label,
  option1,
  option2,
  onPress,
  error,
  disabled = false,
}) => {
  const getStyles = (option) => {
    let borderColor = "border-gray-300";
    let bgColor = "bg-transparent";
    let textColor = "text-black";

    if (value === option) {
      borderColor = "border-celeste-blue";
      bgColor = "bg-celeste-blue";
      textColor = "text-white";
    }

    if (error) {
      borderColor = "border-red-400";
    }

    if (disabled) {
      backgroundColor = "bg-gray-100";
    }

    return {
      style: tw(`border-2 ${borderColor} ${bgColor}`),
      textStyle: tw(textColor),
    };
  };

  return (
    <View style={tw("py-1")}>
      <Text style={tw("font-nunito-400 text-base text-celeste-darkgray")}>
        {label}
      </Text>
      <View style={tw("flex-row")}>
        <View style={tw("flex-1 pr-1")}>
          <Button
            title={option1}
            style={getStyles(option1).style}
            textStyle={getStyles(option1).textStyle}
            onPress={() => onPress(option1)}
          />
        </View>
        <View style={tw("flex-1 pl-1")}>
          <Button
            title={option2}
            style={getStyles(option2).style}
            textStyle={getStyles(option2).textStyle}
            onPress={() => onPress(option2)}
          />
        </View>
      </View>
    </View>
  );
};

export default ToggleButtons;
